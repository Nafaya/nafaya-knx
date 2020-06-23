const CONSTANTS = {
    HEADER_SIZE_10   : 0x06,
    KNXNETIP_VERSION : 0x10,
    KNXNETIP_SERVICE_FAMILIES : {
        CORE: 0x02,
        DEVICE_MANAGMENT: 0x03,
        TUNNELLING: 0x04,
        ROUTING: 0x05,
        REMOTE_LOGGING: 0x06,
        REMOTE_CONFIGURATION_AND_DIAGNOSIS: 0x07,
        OBJECT_SERVER: 0x08
    },
    KNXNETIP_SERVICE_TYPES : {
        // Core 0200h … 020Fh
        SEARCH_REQUEST           : 0x0201,
        SEARCH_RESPONSE          : 0x0202,
        DESCRIPTION_REQUEST      : 0x0203,
        DESCRIPTION_RESPONSE     : 0x0204,
        CONNECT_REQUEST          : 0x0205,
        CONNECT_RESPONSE         : 0x0206,
        CONNECTIONSTATE_REQUEST  : 0x0207,
        CONNECTIONSTATE_RESPONSE : 0x0208,
        DISCONNECT_REQUEST       : 0x0209,
        DISCONNECT_RESPONSE      : 0x020A,

        // Device Management 0310h … 031Fh
        DEVICE_CONFIGURATION_REQUEST : 0x0310,
        DEVICE_CONFIGURATION_ACK     : 0x0311,

        // Tunnelling 0420h … 042Fh
        TUNNELLING_REQUEST : 0x0420,
        TUNNELLING_ACK     : 0x0421,

        // Routing 0530h … 053Fh
        ROUTING_INDICATION   : 0x0530,
        ROUTING_LOST_MESSAGE : 0x0531,
        ROUTING_BUSY         : 0x0532,

        // Remote Logging 0600h … 06FFh
        // Remote Configuration and Diagnosis 0740h … 07FFh
        REMOTE_DIAGNOSTIC_REQUEST          : 0x0740,
        REMOTE_DIAGNOSTIC_RESPONSE         : 0x0741,
        REMOTE_BASIC_CONFIGURATION_REQUEST : 0x0742,
        REMOTE_RESET_REQUEST               : 0x0743
        // Object Server 0800h … 08FFh
    },
    CONNECTION_TYPES: {
        DEVICE_MGMT_CONNECTION : 0x03,
        TUNNEL_CONNECTION      : 0x04,
        REMLOG_CONNECTION      : 0x06,
        REMCONF_CONNECTION     : 0x07,
        OBJSVR_CONNECTION      : 0x08,
    },
    TUNNELLINF_KNX_LAYERS : {
        TUNNEL_LINKLAYER  : 0x02,
        TUNNEL_RAW        : 0x04,
        TUNNEL_BUSMONITOR : 0x80
    },
    HPAI_HOST_PROTOCOL_CODES : {
        IPV4_UDP: 0x01,
        IPV4_TCP: 0x02
    },
    DESCRIPTION_TYPE_CODES : {
        DEVICE_INFO: 0x01,
        SUPP_SVC_FAMILIES: 0x02,
        IP_CONFIG: 0x03,
        IP_CUR_CONFIG: 0x04,
        KNX_ADDRESSES: 0x05,
        MFR_DATA: 0xFE
    },
    KNX_MEDIUM_CODES : {
        TP1      : 0x01,
        PL110    : 0x02,
        RF       : 0x03,
        'KNX IP' : 0x04
    },
    SELECTOR_TYPE_CODES : {
        PRGMODE : 0x01,
        MAC     : 0x02
    },
    RESET_COMMANDS : {
        RESTART      : 0x01,
        MASTER_RESET : 0x02
    }
}
Object.entries(CONSTANTS.KNXNETIP_SERVICE_TYPES).forEach(([k,v]) => {
    CONSTANTS.KNXNETIP_SERVICE_TYPES[v] = k;
})
Object.entries(CONSTANTS.CONNECTION_TYPES).forEach(([k,v]) => {
    CONSTANTS.CONNECTION_TYPES[v] = k;
})
Object.entries(CONSTANTS.HPAI_HOST_PROTOCOL_CODES).forEach(([k,v]) => {
    CONSTANTS.HPAI_HOST_PROTOCOL_CODES[v] = k;
})
Object.entries(CONSTANTS.DESCRIPTION_TYPE_CODES).forEach(([k,v]) => {
    CONSTANTS.DESCRIPTION_TYPE_CODES[v] = k;
})
Object.entries(CONSTANTS.KNX_MEDIUM_CODES).forEach(([k,v]) => {
    CONSTANTS.KNX_MEDIUM_CODES[v] = k;
})
Object.entries(CONSTANTS.SELECTOR_TYPE_CODES).forEach(([k,v]) => {
    CONSTANTS.SELECTOR_TYPE_CODES[v] = k;
})

module.exports = CONSTANTS;
