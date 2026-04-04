// XSS Protection & Input Sanitization
export const Security = {
    // Escape HTML entities
    escapeHtml: (text) => {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Sanitize user input
    sanitizeInput: (input) => {
        if (typeof input !== 'string') return '';
        return input
            .replace(/[<>\"']/g, '')
            .trim()
            .substring(0, 50);
    },

    // Validate Hero ID exists
    isValidHeroId: (id, heroes) => {
        return heroes.some(h => h.id === id);
    },

    // Validate team
    isValidTeam: (team) => {
        return team === 'blue' || team === 'red';
    },

    // Validate draft type
    isValidType: (type) => {
        return type === 'ban' || type === 'pick';
    }
};
