package com.agendaapp.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.agendaapp.app.dto.AppointmentRequest;

import java.util.List;
import java.util.Map;

@Service
public class AppointmentService {

    @Autowired
    private JdbcTemplate jdbc;

    public Map<String, Object> createAppointment(AppointmentRequest body) {
        String existsSql = "SELECT COUNT(*) FROM public.medical_appointments " +
                "WHERE patient_id = ?::uuid AND professional_id = ?::uuid";
        Integer existingCount = jdbc.queryForObject(existsSql, Integer.class,
                body.getPatientId(), body.getProfessionalId());

        if (existingCount != null && existingCount > 0) {
            throw new AppointmentAlreadyExistsException("Error: El paciente ya tiene una cita con este profesional");
        }

        String sql = "INSERT INTO public.medical_appointments " +
                "(patient_id, subspecialty_id, professional_id, appointment_date, reason, status) " +
                "VALUES (?::uuid, ?::uuid, ?::uuid, ?::timestamp, ?, ?)";

        jdbc.update(sql,
                body.getPatientId(),
                body.getSubSpecialtyId(),
                body.getProfessionalId(),
                body.getAppointmentDate(),
                body.getReason(),
                body.getStatus());

        return Map.of("message", "Cita agendada exitosamente");
    }

    public void setAppointmentStatus(String id, String status) {
        jdbc.update("UPDATE public.medical_appointments SET status = ? WHERE id = ?::uuid", status, id);
    }

    public void rescheduleAppointment(String id, String newDate) {
        jdbc.update("UPDATE public.medical_appointments SET appointment_date = ?::timestamp WHERE id = ?::uuid",
                newDate, id);
    }

    public List<Map<String, Object>> getAppointmentsByProfessional(String professionalId) {
        String sql = "SELECT ma.id, ma.appointment_date, ma.status, ma.reason, " +
                "u.first_name, u.last_name " +
                "FROM public.medical_appointments ma " +
                "JOIN public.users u ON ma.patient_id = u.id " +
                "WHERE ma.professional_id = ?::uuid " +
                "ORDER BY ma.appointment_date";
        return jdbc.queryForList(sql, professionalId);
    }

    public List<Map<String, Object>> getAppointmentsByPatient(String patientId, String order) {
        // 🔥 validar order
        String safeOrder = "ASC";
        if ("DESC".equalsIgnoreCase(order)) {
            safeOrder = "DESC";
        }
        String sql = "SELECT a.id, a.appointment_date, a.status, a.professional_id, a.reason, " +
                "u.first_name as professional_first_name, u.last_name as professional_last_name " +
                "FROM public.medical_appointments a " +
                "JOIN public.users u ON a.professional_id = u.id " +
                "WHERE a.patient_id = ?::uuid " +
                "ORDER BY a.appointment_date " + safeOrder;

        return jdbc.queryForList(sql, patientId);
    }

    public List<Map<String, Object>> getProfessionalAppointmentsDates(String professionalId, String startDate,
            String endDate) {
        String sql = "SELECT appointment_date FROM public.medical_appointments " +
                "WHERE professional_id = ?::uuid AND status = 'agendada' " +
                "AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp";

        return jdbc.queryForList(sql, professionalId, startDate + " 00:00:00", endDate + " 23:59:59");
    }

    public List<Map<String, Object>> getProfessionalAppointmentsDay(String professionalId, String date) {
        String sql = "SELECT a.id, a.appointment_date, a.status, a.reason, " +
                "u.first_name, u.last_name " +
                "FROM public.medical_appointments a " +
                "LEFT JOIN public.users u ON a.patient_id = u.id " +
                "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' " +
                "AND a.appointment_date >= ?::timestamp AND a.appointment_date <= ?::timestamp " +
                "ORDER BY a.appointment_date ASC";

        return jdbc.queryForList(sql, professionalId, date + " 00:00:00", date + " 23:59:59");
    }

    public List<Map<String, Object>> getAllProfessionalAppointments(String professionalId) {
        String sql = "SELECT a.id, a.reason, a.appointment_date, a.status, a.patient_id, " +
                "u.id as patient_user_id, u.first_name, u.last_name " +
                "FROM public.medical_appointments a " +
                "LEFT JOIN public.users u ON a.patient_id = u.id " +
                "WHERE a.professional_id = ?::uuid " +
                "ORDER BY a.appointment_date DESC";

        try {
            return jdbc.queryForList(sql, professionalId);
        } catch (DataAccessException ex) {
            throw new IllegalStateException("Error querying professional appointments", ex);
        }
    }

    public Map<String, Object> getProfessionalDashboardStats(String professionalId, String date) {
        Integer todayCount = jdbc.queryForObject(
                "SELECT COUNT(*) FROM public.medical_appointments " +
                        "WHERE professional_id = ?::uuid AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp",
                Integer.class, professionalId, date + " 00:00:00", date + " 23:59:59");

        Integer patientCount = jdbc.queryForObject(
                "SELECT COUNT(DISTINCT patient_id) FROM public.medical_appointments " +
                        "WHERE professional_id = ?::uuid",
                Integer.class, professionalId);

        List<Map<String, Object>> upcoming = jdbc.queryForList(
                "SELECT a.id, a.appointment_date, a.status, a.reason, u.first_name, u.last_name " +
                        "FROM public.medical_appointments a " +
                        "LEFT JOIN public.users u ON a.patient_id = u.id " +
                        "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' AND a.appointment_date >= ?::timestamp "
                        +
                        "ORDER BY a.appointment_date ASC LIMIT 4",
                professionalId, date + " 00:00:00");

        return Map.of(
                "todayCount", todayCount != null ? todayCount : 0,
                "patientCount", patientCount != null ? patientCount : 0,
                "upcomingAppts", upcoming);
    }
}