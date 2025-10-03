export const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    const limited = numbers.slice(0, 11);
    
    if (limited.length >= 11) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`;
    } else if (limited.length >= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    } else if (limited.length >= 2) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length > 0) {
        return `(${limited}`;
    }
    
    return limited;
};

export const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    const limited = numbers.slice(0, 14);
    
    if (limited.length >= 14) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12, 14)}`;
    } else if (limited.length >= 12) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`;
    } else if (limited.length >= 8) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
    } else if (limited.length >= 5) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
    } else if (limited.length >= 2) {
        return `${limited.slice(0, 2)}.${limited.slice(2)}`;
    }
    
    return limited;
};

export const removeWhatsAppFormat = (value: string) => {
    return value.replace(/\D/g, '');
};

export const removeCNPJFormat = (value: string) => {
    return value.replace(/\D/g, '');
};