const initialTeams = {
    teams: {
        'faze': { id: 'faze', name: 'Faze' },
        'sen': { id: 'sen', name: 'Sentinels' },
        'cloudnine': { id: 'cloudnine', name: 'Cloud 9' },
        'nrg': { id: 'nrg', name: 'NRG' },
        'eg': { id: 'eg', name: 'Evil Geniuses' },
        'loud': { id: 'loud', name: 'Loud' },
        'mibr': { id: 'mibr', name: 'MIBR' },
        'thieves': { id: 'thieves', name: '100 Thieves' },
        'furia': { id: 'furia', name: 'Furia' },
        'leviatan': { id: 'leviatan', name: 'Leviatan' },
    },
    columns: {
        'list-main': {
        id: 'list-main',
        title: 'Main List',
        teamIds: ['faze', 'sen', 'cloudnine', 'nrg', 'eg', 'loud', 'mibr', 'thieves', 'furia', 'leviatan'],
        },
        'list-overflow': {
            id: 'main-list',
            title: 'Overflow List',
            teamIds: [],
            }
    },
    columnOrder: ['list-main']
};

export default initialTeams;