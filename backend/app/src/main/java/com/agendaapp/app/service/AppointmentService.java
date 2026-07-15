package com.agendaapp.app.service;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.agendaapp.app.dto.AppointmentRequest;
import com.agendaapp.app.exception.AppointmentAlreadyExistsException;

import java.util.List;
import java.util.Map;

@Service
public class AppointmentService {

    private static final String CHECK_TIME_CONFLICT =
            "SELECT COUNT(*) FROM public.medical_appointments " +
            "WHERE patient_id = ?::uuid AND appointment_date = ?::timestamp AND status = 'agendada'";

    private static final String CHECK_SUBSPECIALTY_CONFLICT =
            "SELECT COUNT(*) FROM public.medical_appointments " +
            "WHERE patient_id = ?::uuid AND subspecialty_id = ?::uuid AND status = 'agendada'";

    private static final String CHECK_PROFESSIONAL_CONFLICT =
            "SELECT COUNT(*) FROM public.medical_appointments " +
            "WHERE patient_id = ?::uuid AND professional_id = ?::uuid";

    private static final String INSERT_APPOINTMENT =
            "INSERT INTO public.medical_appointments " +
            "(patient_id, subspecialty_id, professional_id, appointment_date, reason, status) " +
            "VALUES (?::uuid, ?::uuid, ?::uuid, ?::timestamp, ?, ?)";

    private static final String UPDATE_STATUS =
            "UPDATE public.medical_appointments SET status = ? WHERE id = ?::uuid";

    private static final String UPDATE_DATE =
            "UPDATE public.medical_appointments SET appointment_date = ?::timestamp WHERE id = ?::uuid";

    private static final String GET_BY_PROFESSIONAL =
            "SELECT ma.id, ma.appointment_date, ma.status, ma.reason, " +
            "u.first_name, u.last_name " +
            "FROM public.medical_appointments ma " +
            "JOIN public.users u ON ma.patient_id = u.id " +
            "WHERE ma.professional_id = ?::uuid " +
            "ORDER BY ma.appointment_date";

    private static final String GET_PROFESSIONAL_DATES =
            "SELECT appointment_date FROM public.medical_appointments " +
            "WHERE professional_id = ?::uuid AND status = 'agendada' " +
            "AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp";

    private static final String GET_PROFESSIONAL_DAY =
            "SELECT a.id, a.appointment_date, a.status, a.reason, " +
            "u.first_name, u.last_name " +
            "FROM public.medical_appointments a " +
            "LEFT JOIN public.users u ON a.patient_id = u.id " +
            "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' " +
            "AND a.appointment_date >= ?::timestamp AND a.appointment_date <= ?::timestamp " +
            "ORDER BY a.appointment_date ASC";

    private static final String GET_ALL_PROFESSIONAL =
            "SELECT a.id, a.reason, a.appointment_date, a.status, a.patient_id, " +
            "u.id as patient_user_id, u.first_name, u.last_name " +
            "FROM public.medical_appointments a " +
            "LEFT JOIN public.users u ON a.patient_id = u.id " +
            "WHERE a.professional_id = ?::uuid " +
            "ORDER BY a.appointment_date DESC";

    private static final String GET_TODAY_COUNT =
            "SELECT COUNT(*) FROM public.medical_appointments " +
            "WHERE professional_id = ?::uuid AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp";

    private static final String GET_PATIENT_COUNT =
            "SELECT COUNT(DISTINCT patient_id) FROM public.medical_appointments " +
            "WHERE professional_id = ?::uuid";

    private static final String GET_UPCOMING =
            "SELECT a.id, a.appointment_date, a.status, a.reason, u.first_name, u.last_name " +
            "FROM public.medical_appointments a " +
            "LEFT JOIN public.users u ON a.patient_id = u.id " +
            "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' AND a.appointment_date >= ?::timestamp " +
            "ORDER BY a.appointment_date ASC LIMIT 4";

    private final JdbcTemplate jdbc;

    public AppointmentService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public Map<String, Object> createAppointment(AppointmentRequest body) {
        Integer timeConflictCount = jdbc.queryForObject(CHECK_TIME_CONFLICT, Integer.class,
                body.getPatientId(), body.getAppointmentDate());

        if (timeConflictCount != null && timeConflictCount > 0) {
            throw new AppointmentAlreadyExistsException("Error: Ya tienes una cita programada en la misma fecha y hora");
        }

        Integer subspecialtyConflictCount = jdbc.queryForObject(CHECK_SUBSPECIALTY_CONFLICT, Integer.class,
                body.getPatientId(), body.getSubSpecialtyId());

        if (subspecialtyConflictCount != null && subspecialtyConflictCount > 0) {
            throw new AppointmentAlreadyExistsException("Error: Ya tienes una cita con la misma especialidad y subespecialidad");
        }

        Integer existingCount = jdbc.queryForObject(CHECK_PROFESSIONAL_CONFLICT, Integer.class,
                body.getPatientId(), body.getProfessionalId());

        if (existingCount != null && existingCount > 0) {
            throw new AppointmentAlreadyExistsException("Error: El paciente ya tiene una cita con este profesional");
        }

        jdbc.update(INSERT_APPOINTMENT,
                body.getPatientId(),
                body.getSubSpecialtyId(),
                body.getProfessionalId(),
                body.getAppointmentDate(),
                body.getReason(),
                body.getStatus());

        return Map.of("message", "Cita agendada exitosamente");
    }

    public void setAppointmentStatus(String id, String status) {
        jdbc.update(UPDATE_STATUS, status, id);
    }

    public void rescheduleAppointment(String id, String newDate) {
        jdbc.update(UPDATE_DATE, newDate, id);
    }

    public List<Map<String, Object>> getAppointmentsByProfessional(String professionalId) {
        return jdbc.queryForList(GET_BY_PROFESSIONAL, professionalId);
    }

    public List<Map<String, Object>> getAppointmentsByPatient(String patientId, String order) {
        String safeOrder = "DESC".equalsIgnoreCase(order) ? "DESC" : "ASC";
        String sql = "SELECT a.id, a.appointment_date, a.status, a.professional_id, a.reason, " +
                "u.first_name as professional_first_name, u.last_name as professional_last_name " +
                "FROM public.medical_appointments a " +
                "JOIN public.users u ON a.professional_id = u.id " +
                "WHERE a.patient_id = ?::uuid " +
                "ORDER BY a.appointment_date " + safeOrder;
        return jdbc.queryForList(sql, patientId);
    }

    public List<Map<String, Object>> getProfessionalAppointmentsDates(String professionalId, String startDate, String endDate) {
        return jdbc.queryForList(GET_PROFESSIONAL_DATES,
                professionalId, startDate + " 00:00:00", endDate + " 23:59:59");
    }

    public List<Map<String, Object>> getProfessionalAppointmentsDay(String professionalId, String date) {
        return jdbc.queryForList(GET_PROFESSIONAL_DAY,
                professionalId, date + " 00:00:00", date + " 23:59:59");
    }

    public List<Map<String, Object>> getAllProfessionalAppointments(String professionalId) {
        try {
            return jdbc.queryForList(GET_ALL_PROFESSIONAL, professionalId);
        } catch (DataAccessException ex) {
            throw new IllegalStateException("Error querying professional appointments", ex);
        }
    }

    public Map<String, Object> getProfessionalDashboardStats(String professionalId, String date) {
        Integer todayCount = jdbc.queryForObject(GET_TODAY_COUNT,
                Integer.class, professionalId, date + " 00:00:00", date + " 23:59:59");

        Integer patientCount = jdbc.queryForObject(GET_PATIENT_COUNT,
                Integer.class, professionalId);

        List<Map<String, Object>> upcoming = jdbc.queryForList(GET_UPCOMING,
                professionalId, date + " 00:00:00");

        return Map.of(
                "todayCount", todayCount != null ? todayCount : 0,
                "patientCount", patientCount != null ? patientCount : 0,
                "upcomingAppts", upcoming);
    }
}