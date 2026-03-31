import { checkEmailExists } from "@/services/registerService";

export const validateRegister = async (formData: any, isProfessional: boolean = false) => {
    const { firstName, lastName, email, phone, password, confirmPassword, professionalKey, licenseNumber } = formData;
    const normalize = (text: string) =>
        text
            .toLowerCase()
            .normalize("NFD")                // separate letters and tildes
            .replace(/[\u0300-\u036f]/g, "") // delete tildes
            .replace(/\s+/g, "");            // delete spaces
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return "Todos los campos básicos son obligatorios";
    }

    if (isProfessional) {

        const exists = await checkEmailExists(email);
        if (exists) {
            return "El correo electrónico ya existe, intenta iniciar sesión";
        }
        if (!professionalKey || !licenseNumber || !formData.specialtyId || !formData.subspecialtyId) {
            return "La clave, el número de registro, la especialidad y subespecialidad son obligatorios";
        }
        const currentYear = new Date().getFullYear();

        const expectedKey =
            normalize(firstName) +
            normalize(lastName) +
            currentYear;
        if (professionalKey !== expectedKey) {
            return "La clave de acceso profesional es incorrecta";
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