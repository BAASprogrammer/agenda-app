import { checkEmailExists } from "@/services/registerService";

export const validateRegister = async (formData: any, isProfessional: boolean = false) => {
    const { firstName, lastName, email, phone, password, confirmPassword, licenseNumber } = formData;
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return "Todos los campos básicos son obligatorios";
    }

    if (isProfessional) {

        const exists = await checkEmailExists(email);
        if (exists) {
            return "El correo electrónico ya existe, intenta iniciar sesión";
        }
        if (!licenseNumber || !formData.specialtyId || !formData.subspecialtyId) {
            return "El número de registro, la especialidad y subespecialidad son obligatorios";
        }
    }

    if (phone.length > 12) {
        return "El teléfono debe tener como máximo 12 caracteres";
    }

    if (!phone.match(/^\+[0-9]+$/)) {
        return "El teléfono debe contener solo números y el símbolo + al inicio";
    }

    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden";
    }

    if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
    }

    return "";
};