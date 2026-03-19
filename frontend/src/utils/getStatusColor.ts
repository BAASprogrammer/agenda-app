export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'agendada': return 'bg-cyan-100 text-cyan-700';
        case 'completada': return 'bg-emerald-100 text-emerald-700';
        case 'cancelada': return 'bg-rose-100 text-rose-700';
        default: return 'bg-slate-100 text-slate-600';
    }
};