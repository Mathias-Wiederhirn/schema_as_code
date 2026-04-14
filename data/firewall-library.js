window.FIREWALL_LIBRARY = {
  "generated_at": "2026-04-14T17:11:34+02:00",
  "summary": {
    "applications": 100,
    "rules": 1000.0,
    "sources": 453,
    "destinations": 258,
    "actions": {
      "allow": 700,
      "deny": 300
    }
  },
  "applications": [
    {
      "trigram": "ACM",
      "name": "Access Management",
      "tier": "identity",
      "folder": "acm",
      "policy_set": "acm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ACM_corp-users",
          "destination": "ACM_idm-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "636"
          ],
          "action": "allow",
          "priority": 100,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ACM_ops-admin",
          "destination": "ACM_idm-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 101,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ACM_idm-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 102,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ACM_idm-cluster",
          "destination": "ACM_directory-core",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 103,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ACM_integration-bus",
          "destination": "ACM_idm-cluster",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 104,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "API_public-api",
          "destination": "ACM_access-management",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 105,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ACM_access-management",
          "destination": "API_public-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 106,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "KEY_key-vault",
          "destination": "ACM_access-management",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 107,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ACM_access-management",
          "destination": "KEY_key-vault",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 108,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ACM_idm-cluster",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 109,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "API",
      "name": "Public API",
      "tier": "edge",
      "folder": "api",
      "policy_set": "api-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "API_internet",
          "destination": "API_api-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 110,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "API_dev-vpn",
          "destination": "API_api-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 111,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "API_api-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 112,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "API_api-gateway",
          "destination": "API_origin-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 113,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "API_integration-bus",
          "destination": "API_api-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 114,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "ACM_access-management",
          "destination": "API_public-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 115,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "API_public-api",
          "destination": "ACM_access-management",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 116,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "KUB_kubernetes-api",
          "destination": "API_public-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 117,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "API_public-api",
          "destination": "KUB_kubernetes-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 118,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "API_api-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 119,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "APP",
      "name": "Application Core",
      "tier": "app",
      "folder": "app",
      "policy_set": "app-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "APP_web-tier",
          "destination": "APP_app-tier",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8080",
            "8443"
          ],
          "action": "allow",
          "priority": 120,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "APP_corp-admin",
          "destination": "APP_app-tier",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 121,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "APP_app-tier",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 122,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "APP_app-tier",
          "destination": "APP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 123,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "APP_integration-bus",
          "destination": "APP_app-tier",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 124,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "ATH_auth-service",
          "destination": "APP_application-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 125,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "APP_application-core",
          "destination": "ATH_auth-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 126,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LAB_lab-platform",
          "destination": "APP_application-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 127,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "APP_application-core",
          "destination": "LAB_lab-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 128,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "APP_app-tier",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "21/tcp"
          ],
          "action": "deny",
          "priority": 129,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ATH",
      "name": "Auth Service",
      "tier": "identity",
      "folder": "ath",
      "policy_set": "ath-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ATH_app-tier",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 130,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ATH_ops-admin",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 131,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 132,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ATH_auth-service",
          "destination": "ATH_directory-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 133,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ATH_integration-bus",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 134,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "APP_application-core",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 135,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ATH_auth-service",
          "destination": "APP_application-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 136,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LDP_ldap-service",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 137,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ATH_auth-service",
          "destination": "LDP_ldap-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 138,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ATH_auth-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 139,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "AUD",
      "name": "Audit Platform",
      "tier": "ops",
      "folder": "aud",
      "policy_set": "aud-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "AUD_ops-admin",
          "destination": "AUD_audit-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9200"
          ],
          "action": "allow",
          "priority": 140,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "AUD_dev-vpn",
          "destination": "AUD_audit-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 141,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "AUD_audit-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 142,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "AUD_audit-store",
          "destination": "AUD_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 143,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "AUD_monitoring-hub",
          "destination": "AUD_audit-store",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 144,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "BIL_billing-engine",
          "destination": "AUD_audit-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 145,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "AUD_audit-platform",
          "destination": "BIL_billing-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 146,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LEG_legacy-bridge",
          "destination": "AUD_audit-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 147,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "AUD_audit-platform",
          "destination": "LEG_legacy-bridge",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 148,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "AUD_audit-store",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 149,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "BIL",
      "name": "Billing Engine",
      "tier": "finance",
      "folder": "bil",
      "policy_set": "bil-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "BIL_app-tier",
          "destination": "BIL_billing-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5432"
          ],
          "action": "allow",
          "priority": 150,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "BIL_corp-admin",
          "destination": "BIL_billing-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 151,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "BIL_billing-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 152,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "BIL_billing-db",
          "destination": "BIL_audit-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 153,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "BIL_integration-bus",
          "destination": "BIL_billing-db",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 154,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "AUD_audit-platform",
          "destination": "BIL_billing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 155,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "BIL_billing-engine",
          "destination": "AUD_audit-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 156,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LOG_log-collector",
          "destination": "BIL_billing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 157,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "BIL_billing-engine",
          "destination": "LOG_log-collector",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 158,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "BIL_billing-db",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 159,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "BKP",
      "name": "Backup Control",
      "tier": "ops",
      "folder": "bkp",
      "policy_set": "bkp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "BKP_backup-agents",
          "destination": "BKP_backup-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8200"
          ],
          "action": "allow",
          "priority": 160,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "BKP_ops-admin",
          "destination": "BKP_backup-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 161,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "BKP_backup-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 162,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "BKP_backup-vault",
          "destination": "BKP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 163,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "BKP_monitoring-hub",
          "destination": "BKP_backup-vault",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 164,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "BUS_business-portal",
          "destination": "BKP_backup-control",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 165,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "BKP_backup-control",
          "destination": "BUS_business-portal",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 166,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LON_london-hub",
          "destination": "BKP_backup-control",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 167,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "BKP_backup-control",
          "destination": "LON_london-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 168,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "BKP_backup-vault",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 169,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "BUS",
      "name": "Business Portal",
      "tier": "web",
      "folder": "bus",
      "policy_set": "bus-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "BUS_internet",
          "destination": "BUS_portal-frontends",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "80",
            "443"
          ],
          "action": "allow",
          "priority": 170,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "BUS_dev-vpn",
          "destination": "BUS_portal-frontends",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 171,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "BUS_portal-frontends",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 172,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "BUS_portal-frontends",
          "destination": "BUS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 173,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "BUS_integration-bus",
          "destination": "BUS_portal-frontends",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 174,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "BKP_backup-control",
          "destination": "BUS_business-portal",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 175,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "BUS_business-portal",
          "destination": "BKP_backup-control",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 176,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "LST_listing-api",
          "destination": "BUS_business-portal",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 177,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "BUS_business-portal",
          "destination": "LST_listing-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 178,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "BUS_portal-frontends",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 179,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CAD",
      "name": "Card Services",
      "tier": "finance",
      "folder": "cad",
      "policy_set": "cad-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CAD_payment-tier",
          "destination": "CAD_card-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 180,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CAD_corp-admin",
          "destination": "CAD_card-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 181,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CAD_card-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 182,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CAD_card-core",
          "destination": "CAD_audit-ledger",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 183,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CAD_integration-bus",
          "destination": "CAD_card-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 184,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "CAS_case-tracking",
          "destination": "CAD_card-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 185,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CAD_card-services",
          "destination": "CAS_case-tracking",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 186,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MAI_mail-api",
          "destination": "CAD_card-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 187,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CAD_card-services",
          "destination": "MAI_mail-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 188,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CAD_card-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "5900/tcp"
          ],
          "action": "deny",
          "priority": 189,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CAS",
      "name": "Case Tracking",
      "tier": "app",
      "folder": "cas",
      "policy_set": "cas-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CAS_corp-users",
          "destination": "CAS_case-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 190,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CAS_ops-admin",
          "destination": "CAS_case-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 191,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CAS_case-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 192,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CAS_case-api",
          "destination": "CAS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 193,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CAS_integration-bus",
          "destination": "CAS_case-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 194,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CAD_card-services",
          "destination": "CAS_case-tracking",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 195,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CAS_case-tracking",
          "destination": "CAD_card-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 196,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MDM_master-data",
          "destination": "CAS_case-tracking",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 197,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CAS_case-tracking",
          "destination": "MDM_master-data",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 198,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CAS_case-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "445/tcp"
          ],
          "action": "deny",
          "priority": 199,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CHT",
      "name": "Chat Gateway",
      "tier": "collab",
      "folder": "cht",
      "policy_set": "cht-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CHT_internet",
          "destination": "CHT_chat-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5222"
          ],
          "action": "allow",
          "priority": 200,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CHT_dev-vpn",
          "destination": "CHT_chat-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 201,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CHT_chat-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 202,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CHT_chat-hub",
          "destination": "CHT_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 203,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CHT_integration-bus",
          "destination": "CHT_chat-hub",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 204,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CIC_ci-control",
          "destination": "CHT_chat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 205,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CHT_chat-gateway",
          "destination": "CIC_ci-control",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 206,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MED_media-pipeline",
          "destination": "CHT_chat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 207,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CHT_chat-gateway",
          "destination": "MED_media-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 208,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CHT_chat-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 209,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CIC",
      "name": "CI Control",
      "tier": "devops",
      "folder": "cic",
      "policy_set": "cic-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CIC_dev-vpn",
          "destination": "CIC_ci-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 210,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CIC_corp-admin",
          "destination": "CIC_ci-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 211,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CIC_ci-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 212,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CIC_ci-runners",
          "destination": "CIC_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 213,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CIC_integration-bus",
          "destination": "CIC_ci-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 214,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CHT_chat-gateway",
          "destination": "CIC_ci-control",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 215,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CIC_ci-control",
          "destination": "CHT_chat-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 216,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MES_messaging-core",
          "destination": "CIC_ci-control",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 217,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CIC_ci-control",
          "destination": "MES_messaging-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 218,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CIC_ci-runners",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 219,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CMP",
      "name": "Compliance Vault",
      "tier": "ops",
      "folder": "cmp",
      "policy_set": "cmp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CMP_audit-platform",
          "destination": "CMP_compliance-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9200"
          ],
          "action": "allow",
          "priority": 220,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CMP_ops-admin",
          "destination": "CMP_compliance-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 221,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CMP_compliance-store",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 222,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CMP_compliance-store",
          "destination": "CMP_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 223,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CMP_monitoring-hub",
          "destination": "CMP_compliance-store",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 224,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CRM_crm-platform",
          "destination": "CMP_compliance-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 225,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CMP_compliance-vault",
          "destination": "CRM_crm-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 226,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MET_metrics-gateway",
          "destination": "CMP_compliance-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 227,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CMP_compliance-vault",
          "destination": "MET_metrics-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 228,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CMP_compliance-store",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "21/tcp"
          ],
          "action": "deny",
          "priority": 229,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CRM",
      "name": "CRM Platform",
      "tier": "app",
      "folder": "crm",
      "policy_set": "crm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CRM_corp-users",
          "destination": "CRM_crm-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5432"
          ],
          "action": "allow",
          "priority": 230,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CRM_dev-vpn",
          "destination": "CRM_crm-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 231,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CRM_crm-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 232,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CRM_crm-api",
          "destination": "CRM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 233,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CRM_integration-bus",
          "destination": "CRM_crm-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 234,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CMP_compliance-vault",
          "destination": "CRM_crm-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 235,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CRM_crm-platform",
          "destination": "CMP_compliance-vault",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 236,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MFA_mfa-service",
          "destination": "CRM_crm-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 237,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CRM_crm-platform",
          "destination": "MFA_mfa-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 238,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CRM_crm-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 239,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CSH",
      "name": "Cash Ledger",
      "tier": "finance",
      "folder": "csh",
      "policy_set": "csh-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CSH_finance-app",
          "destination": "CSH_cash-ledger-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 240,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CSH_corp-admin",
          "destination": "CSH_cash-ledger-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 241,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CSH_cash-ledger-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 242,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CSH_cash-ledger-db",
          "destination": "CSH_audit-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 243,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CSH_integration-bus",
          "destination": "CSH_cash-ledger-db",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 244,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CTL_control-plane",
          "destination": "CSH_cash-ledger",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 245,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CSH_cash-ledger",
          "destination": "CTL_control-plane",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 246,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MLP_ml-platform",
          "destination": "CSH_cash-ledger",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 247,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CSH_cash-ledger",
          "destination": "MLP_ml-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 248,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CSH_cash-ledger-db",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 249,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CTL",
      "name": "Control Plane",
      "tier": "platform",
      "folder": "ctl",
      "policy_set": "ctl-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CTL_ops-admin",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6443"
          ],
          "action": "allow",
          "priority": 250,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CTL_ops-admin",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 251,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 252,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CTL_control-plane",
          "destination": "CTL_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 253,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CTL_control-plane",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 254,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CSH_cash-ledger",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 255,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CTL_control-plane",
          "destination": "CSH_cash-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 256,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MON_monitoring-suite",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 257,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CTL_control-plane",
          "destination": "MON_monitoring-suite",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 258,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CTL_control-plane",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 259,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "CUS",
      "name": "Customer Hub",
      "tier": "web",
      "folder": "cus",
      "policy_set": "cus-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "CUS_internet",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 260,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "CUS_dev-vpn",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 261,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 262,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "CUS_customer-hub",
          "destination": "CUS_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 263,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "CUS_integration-bus",
          "destination": "CUS_customer-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 264,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "DAS_data-science",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 265,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "CUS_customer-hub",
          "destination": "DAS_data-science",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 266,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "MQS_queue-service",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 267,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "CUS_customer-hub",
          "destination": "MQS_queue-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 268,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "CUS_customer-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 269,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "DAS",
      "name": "Data Science",
      "tier": "analytics",
      "folder": "das",
      "policy_set": "das-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "DAS_analytics-vpc",
          "destination": "DAS_ml-workbench",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8888"
          ],
          "action": "allow",
          "priority": 270,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "DAS_corp-admin",
          "destination": "DAS_ml-workbench",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 271,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "DAS_ml-workbench",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 272,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "DAS_ml-workbench",
          "destination": "DAS_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 273,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "DAS_integration-bus",
          "destination": "DAS_ml-workbench",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 274,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "CUS_customer-hub",
          "destination": "DAS_data-science",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 275,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "DAS_data-science",
          "destination": "CUS_customer-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 276,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "NAT_nat-gateway",
          "destination": "DAS_data-science",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 277,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "DAS_data-science",
          "destination": "NAT_nat-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 278,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "DAS_ml-workbench",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 279,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "DBA",
      "name": "Database Admin",
      "tier": "ops",
      "folder": "dba",
      "policy_set": "dba-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "DBA_dba-jump",
          "destination": "DBA_postgres-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "5432"
          ],
          "action": "allow",
          "priority": 280,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "DBA_ops-admin",
          "destination": "DBA_postgres-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 281,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "DBA_postgres-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 282,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "DBA_postgres-fleet",
          "destination": "DBA_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 283,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "DBA_monitoring-hub",
          "destination": "DBA_postgres-fleet",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 284,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "DLP_data-loss-prevention",
          "destination": "DBA_database-admin",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 285,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "DBA_database-admin",
          "destination": "DLP_data-loss-prevention",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 286,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "NET_network-core",
          "destination": "DBA_database-admin",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 287,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "DBA_database-admin",
          "destination": "NET_network-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 288,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "DBA_postgres-fleet",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 289,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "DLP",
      "name": "Data Loss Prevention",
      "tier": "security",
      "folder": "dlp",
      "policy_set": "dlp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "DLP_corp-egress",
          "destination": "DLP_dlp-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6514"
          ],
          "action": "allow",
          "priority": 290,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "DLP_dev-vpn",
          "destination": "DLP_dlp-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 291,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "DLP_dlp-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 292,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "DLP_dlp-cluster",
          "destination": "DLP_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 293,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "DLP_integration-bus",
          "destination": "DLP_dlp-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 294,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "DBA_database-admin",
          "destination": "DLP_data-loss-prevention",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 295,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "DLP_data-loss-prevention",
          "destination": "DBA_database-admin",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 296,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "NTP_time-service",
          "destination": "DLP_data-loss-prevention",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 297,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "DLP_data-loss-prevention",
          "destination": "NTP_time-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 298,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "DLP_dlp-cluster",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 299,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "DNS",
      "name": "DNS Resolver",
      "tier": "core",
      "folder": "dns",
      "policy_set": "dns-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "DNS_all-zones",
          "destination": "DNS_resolver-pool",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 300,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "DNS_corp-admin",
          "destination": "DNS_resolver-pool",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 301,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "DNS_resolver-pool",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 302,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "DNS_resolver-pool",
          "destination": "DNS_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 303,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "DNS_integration-bus",
          "destination": "DNS_resolver-pool",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 304,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "DOC_document-service",
          "destination": "DNS_dns-resolver",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 305,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "DNS_dns-resolver",
          "destination": "DOC_document-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 306,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "OBS_observability",
          "destination": "DNS_dns-resolver",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 307,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "DNS_dns-resolver",
          "destination": "OBS_observability",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 308,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "DNS_resolver-pool",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 309,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "DOC",
      "name": "Document Service",
      "tier": "app",
      "folder": "doc",
      "policy_set": "doc-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "DOC_corp-users",
          "destination": "DOC_doc-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 310,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "DOC_ops-admin",
          "destination": "DOC_doc-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 311,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "DOC_doc-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 312,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "DOC_doc-api",
          "destination": "DOC_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 313,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "DOC_integration-bus",
          "destination": "DOC_doc-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 314,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "DNS_dns-resolver",
          "destination": "DOC_document-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 315,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "DOC_document-service",
          "destination": "DNS_dns-resolver",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 316,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "OMS_order-service",
          "destination": "DOC_document-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 317,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "DOC_document-service",
          "destination": "OMS_order-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 318,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "DOC_doc-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 319,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "EAI",
      "name": "Enterprise Integration",
      "tier": "integration",
      "folder": "eai",
      "policy_set": "eai-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "EAI_app-tier",
          "destination": "EAI_esb-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5672"
          ],
          "action": "allow",
          "priority": 320,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "EAI_dev-vpn",
          "destination": "EAI_esb-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 321,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "EAI_esb-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 322,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "EAI_esb-cluster",
          "destination": "EAI_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 323,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "EAI_integration-bus",
          "destination": "EAI_esb-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 324,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "ECM_commerce-engine",
          "destination": "EAI_enterprise-integration",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 325,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "EAI_enterprise-integration",
          "destination": "ECM_commerce-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 326,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "OPS_operations-hub",
          "destination": "EAI_enterprise-integration",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 327,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "EAI_enterprise-integration",
          "destination": "OPS_operations-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 328,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "EAI_esb-cluster",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 329,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ECM",
      "name": "Commerce Engine",
      "tier": "web",
      "folder": "ecm",
      "policy_set": "ecm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ECM_internet",
          "destination": "ECM_commerce-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 330,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ECM_corp-admin",
          "destination": "ECM_commerce-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 331,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ECM_commerce-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 332,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ECM_commerce-web",
          "destination": "ECM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 333,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ECM_integration-bus",
          "destination": "ECM_commerce-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 334,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "EAI_enterprise-integration",
          "destination": "ECM_commerce-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 335,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ECM_commerce-engine",
          "destination": "EAI_enterprise-integration",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 336,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ORC_orchestration",
          "destination": "ECM_commerce-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 337,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ECM_commerce-engine",
          "destination": "ORC_orchestration",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 338,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ECM_commerce-web",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 339,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "EDI",
      "name": "EDI Gateway",
      "tier": "integration",
      "folder": "edi",
      "policy_set": "edi-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "EDI_partners",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 340,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "EDI_ops-admin",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 341,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 342,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "EDI_edi-gateway",
          "destination": "EDI_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 343,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "EDI_integration-bus",
          "destination": "EDI_edi-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 344,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "ELK_observability-stack",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 345,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "EDI_edi-gateway",
          "destination": "ELK_observability-stack",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 346,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PAY_payments",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 347,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "EDI_edi-gateway",
          "destination": "PAY_payments",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 348,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "EDI_edi-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 349,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ELK",
      "name": "Observability Stack",
      "tier": "ops",
      "folder": "elk",
      "policy_set": "elk-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ELK_app-tier",
          "destination": "ELK_elk-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5044",
            "9200"
          ],
          "action": "allow",
          "priority": 350,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ELK_dev-vpn",
          "destination": "ELK_elk-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 351,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ELK_elk-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 352,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ELK_elk-stack",
          "destination": "ELK_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 353,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ELK_monitoring-hub",
          "destination": "ELK_elk-stack",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 354,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "EDI_edi-gateway",
          "destination": "ELK_observability-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 355,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ELK_observability-stack",
          "destination": "EDI_edi-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 356,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PDF_pdf-renderer",
          "destination": "ELK_observability-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 357,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ELK_observability-stack",
          "destination": "PDF_pdf-renderer",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 358,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ELK_elk-stack",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 359,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "EML",
      "name": "Mail Relay",
      "tier": "messaging",
      "folder": "eml",
      "policy_set": "eml-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "EML_app-tier",
          "destination": "EML_smtp-relay",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 360,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "EML_corp-admin",
          "destination": "EML_smtp-relay",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 361,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "EML_smtp-relay",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 362,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "EML_smtp-relay",
          "destination": "EML_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 363,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "EML_message-backbone",
          "destination": "EML_smtp-relay",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 364,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "ERP_erp-core",
          "destination": "EML_mail-relay",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 365,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "EML_mail-relay",
          "destination": "ERP_erp-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 366,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PIM_product-info",
          "destination": "EML_mail-relay",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 367,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "EML_mail-relay",
          "destination": "PIM_product-info",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 368,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "EML_smtp-relay",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 369,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ERP",
      "name": "ERP Core",
      "tier": "finance",
      "folder": "erp",
      "policy_set": "erp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ERP_corp-users",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 370,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ERP_ops-admin",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 371,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 372,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ERP_erp-core",
          "destination": "ERP_audit-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 373,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ERP_integration-bus",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 374,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "EML_mail-relay",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 375,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ERP_erp-core",
          "destination": "EML_mail-relay",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 376,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PKI_pki-services",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 377,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ERP_erp-core",
          "destination": "PKI_pki-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 378,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ERP_erp-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "5900/tcp"
          ],
          "action": "deny",
          "priority": 379,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ETL",
      "name": "ETL Pipeline",
      "tier": "analytics",
      "folder": "etl",
      "policy_set": "etl-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ETL_data-lake",
          "destination": "ETL_etl-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9092"
          ],
          "action": "allow",
          "priority": 380,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ETL_dev-vpn",
          "destination": "ETL_etl-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 381,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ETL_etl-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 382,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ETL_etl-workers",
          "destination": "ETL_lakehouse-bus",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 383,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ETL_integration-bus",
          "destination": "ETL_etl-workers",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 384,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "EVT_event-bus",
          "destination": "ETL_etl-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 385,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ETL_etl-pipeline",
          "destination": "EVT_event-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 386,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PLT_platform-core",
          "destination": "ETL_etl-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 387,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ETL_etl-pipeline",
          "destination": "PLT_platform-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 388,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ETL_etl-workers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 389,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "EVT",
      "name": "Event Bus",
      "tier": "integration",
      "folder": "evt",
      "policy_set": "evt-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "EVT_app-tier",
          "destination": "EVT_event-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672",
            "9092"
          ],
          "action": "allow",
          "priority": 390,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "EVT_corp-admin",
          "destination": "EVT_event-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 391,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "EVT_event-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 392,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "EVT_event-brokers",
          "destination": "EVT_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 393,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "EVT_integration-bus",
          "destination": "EVT_event-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 394,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "ETL_etl-pipeline",
          "destination": "EVT_event-bus",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 395,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "EVT_event-bus",
          "destination": "ETL_etl-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 396,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PRC_pricing-engine",
          "destination": "EVT_event-bus",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 397,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "EVT_event-bus",
          "destination": "PRC_pricing-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 398,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "EVT_event-brokers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "21/tcp"
          ],
          "action": "deny",
          "priority": 399,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "EXP",
      "name": "Export Service",
      "tier": "batch",
      "folder": "exp",
      "policy_set": "exp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "EXP_ops-admin",
          "destination": "EXP_export-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 400,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "EXP_ops-admin",
          "destination": "EXP_export-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 401,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "EXP_export-runners",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 402,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "EXP_export-runners",
          "destination": "EXP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 403,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "EXP_integration-bus",
          "destination": "EXP_export-runners",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 404,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "FED_federation-hub",
          "destination": "EXP_export-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 405,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "EXP_export-service",
          "destination": "FED_federation-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 406,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PRD_product-api",
          "destination": "EXP_export-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 407,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "EXP_export-service",
          "destination": "PRD_product-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 408,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "EXP_export-runners",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 409,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "FED",
      "name": "Federation Hub",
      "tier": "identity",
      "folder": "fed",
      "policy_set": "fed-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "FED_partners",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 410,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "FED_dev-vpn",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 411,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 412,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "FED_federation-hub",
          "destination": "FED_directory-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 413,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "FED_integration-bus",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 414,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "EXP_export-service",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 415,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "FED_federation-hub",
          "destination": "EXP_export-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 416,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "PRX_proxy-fleet",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 417,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "FED_federation-hub",
          "destination": "PRX_proxy-fleet",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 418,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "FED_federation-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 419,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "FIL",
      "name": "File Transfer",
      "tier": "integration",
      "folder": "fil",
      "policy_set": "fil-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "FIL_partners",
          "destination": "FIL_mft-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 420,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "FIL_corp-admin",
          "destination": "FIL_mft-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 421,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "FIL_mft-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 422,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "FIL_mft-gateway",
          "destination": "FIL_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 423,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "FIL_integration-bus",
          "destination": "FIL_mft-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 424,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "FIN_finance-api",
          "destination": "FIL_file-transfer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 425,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "FIL_file-transfer",
          "destination": "FIN_finance-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 426,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "QAS_qa-services",
          "destination": "FIL_file-transfer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 427,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "FIL_file-transfer",
          "destination": "QAS_qa-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 428,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "FIL_mft-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 429,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "FIN",
      "name": "Finance API",
      "tier": "finance",
      "folder": "fin",
      "policy_set": "fin-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "FIN_corp-users",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 430,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "FIN_ops-admin",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 431,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 432,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "FIN_finance-api",
          "destination": "FIN_audit-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 433,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "FIN_integration-bus",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 434,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "FIL_file-transfer",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 435,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "FIN_finance-api",
          "destination": "FIL_file-transfer",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 436,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "QRY_query-engine",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 437,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "FIN_finance-api",
          "destination": "QRY_query-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 438,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "FIN_finance-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 439,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "FRA",
      "name": "Fraud Engine",
      "tier": "security",
      "folder": "fra",
      "policy_set": "fra-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "FRA_payment-tier",
          "destination": "FRA_fraud-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 440,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "FRA_dev-vpn",
          "destination": "FRA_fraud-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 441,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "FRA_fraud-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 442,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "FRA_fraud-core",
          "destination": "FRA_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 443,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "FRA_integration-bus",
          "destination": "FRA_fraud-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 444,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "GAT_gateway-mesh",
          "destination": "FRA_fraud-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 445,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "FRA_fraud-engine",
          "destination": "GAT_gateway-mesh",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 446,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "QUE_queue-adapter",
          "destination": "FRA_fraud-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 447,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "FRA_fraud-engine",
          "destination": "QUE_queue-adapter",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 448,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "FRA_fraud-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 449,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "GAT",
      "name": "Gateway Mesh",
      "tier": "edge",
      "folder": "gat",
      "policy_set": "gat-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "GAT_internet",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 450,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "GAT_corp-admin",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 451,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 452,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "GAT_gateway-mesh",
          "destination": "GAT_origin-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 453,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "GAT_integration-bus",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 454,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "FRA_fraud-engine",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 455,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "GAT_gateway-mesh",
          "destination": "FRA_fraud-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 456,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "RAB_rabbit-cluster",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 457,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "GAT_gateway-mesh",
          "destination": "RAB_rabbit-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 458,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "GAT_gateway-mesh",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 459,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "GIT",
      "name": "Git Service",
      "tier": "devops",
      "folder": "git",
      "policy_set": "git-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "GIT_dev-vpn",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 460,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "GIT_ops-admin",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 461,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 462,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "GIT_git-service",
          "destination": "GIT_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 463,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "GIT_integration-bus",
          "destination": "GIT_git-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 464,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "GOV_governance-api",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 465,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "GIT_git-service",
          "destination": "GOV_governance-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 466,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "REC_recommendation",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 467,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "GIT_git-service",
          "destination": "REC_recommendation",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 468,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "GIT_git-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 469,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "GOV",
      "name": "Governance API",
      "tier": "ops",
      "folder": "gov",
      "policy_set": "gov-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "GOV_ops-admin",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 470,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "GOV_dev-vpn",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 471,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 472,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "GOV_governance-api",
          "destination": "GOV_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 473,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "GOV_monitoring-hub",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 474,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "GIT_git-service",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 475,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "GOV_governance-api",
          "destination": "GIT_git-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 476,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "REG_registry",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 477,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "GOV_governance-api",
          "destination": "REG_registry",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 478,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "GOV_governance-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 479,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "GRF",
      "name": "Graph Service",
      "tier": "analytics",
      "folder": "grf",
      "policy_set": "grf-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "GRF_app-tier",
          "destination": "GRF_graph-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "7687"
          ],
          "action": "allow",
          "priority": 480,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "GRF_corp-admin",
          "destination": "GRF_graph-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 481,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "GRF_graph-db",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 482,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "GRF_graph-db",
          "destination": "GRF_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 483,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "GRF_integration-bus",
          "destination": "GRF_graph-db",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 484,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "HCM_human-capital",
          "destination": "GRF_graph-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 485,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "GRF_graph-service",
          "destination": "HCM_human-capital",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 486,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "REP_reporting",
          "destination": "GRF_graph-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 487,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "GRF_graph-service",
          "destination": "REP_reporting",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 488,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "GRF_graph-db",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 489,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "HCM",
      "name": "Human Capital",
      "tier": "corp",
      "folder": "hcm",
      "policy_set": "hcm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "HCM_corp-users",
          "destination": "HCM_hcm-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 490,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "HCM_ops-admin",
          "destination": "HCM_hcm-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 491,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "HCM_hcm-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 492,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "HCM_hcm-suite",
          "destination": "HCM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 493,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "HCM_corp-services",
          "destination": "HCM_hcm-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 494,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "GRF_graph-service",
          "destination": "HCM_human-capital",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 495,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "HCM_human-capital",
          "destination": "GRF_graph-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 496,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "RIS_risk-engine",
          "destination": "HCM_human-capital",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 497,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "HCM_human-capital",
          "destination": "RIS_risk-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 498,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "HCM_hcm-suite",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 499,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "HLP",
      "name": "Helpdesk",
      "tier": "corp",
      "folder": "hlp",
      "policy_set": "hlp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "HLP_corp-users",
          "destination": "HLP_helpdesk-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 500,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "HLP_dev-vpn",
          "destination": "HLP_helpdesk-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 501,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "HLP_helpdesk-web",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 502,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "HLP_helpdesk-web",
          "destination": "HLP_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 503,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "HLP_corp-services",
          "destination": "HLP_helpdesk-web",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 504,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "HRM_hr-manager",
          "destination": "HLP_helpdesk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 505,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "HLP_helpdesk",
          "destination": "HRM_hr-manager",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 506,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "RPT_report-builder",
          "destination": "HLP_helpdesk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 507,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "HLP_helpdesk",
          "destination": "RPT_report-builder",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 508,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "HLP_helpdesk-web",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 509,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "HRM",
      "name": "HR Manager",
      "tier": "corp",
      "folder": "hrm",
      "policy_set": "hrm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "HRM_corp-users",
          "destination": "HRM_hrm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 510,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "HRM_corp-admin",
          "destination": "HRM_hrm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 511,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "HRM_hrm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 512,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "HRM_hrm-core",
          "destination": "HRM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 513,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "HRM_corp-services",
          "destination": "HRM_hrm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 514,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "HLP_helpdesk",
          "destination": "HRM_hr-manager",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 515,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "HRM_hr-manager",
          "destination": "HLP_helpdesk",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 516,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SAP_sap-gateway",
          "destination": "HRM_hr-manager",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 517,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "HRM_hr-manager",
          "destination": "SAP_sap-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 518,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "HRM_hrm-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 519,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "IAM",
      "name": "Identity Access",
      "tier": "identity",
      "folder": "iam",
      "policy_set": "iam-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "IAM_corp-users",
          "destination": "IAM_iam-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "636"
          ],
          "action": "allow",
          "priority": 520,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "IAM_ops-admin",
          "destination": "IAM_iam-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 521,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "IAM_iam-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 522,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "IAM_iam-core",
          "destination": "IAM_directory-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 523,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "IAM_integration-bus",
          "destination": "IAM_iam-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 524,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "IDS_intrusion-detection",
          "destination": "IAM_identity-access",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 525,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "IAM_identity-access",
          "destination": "IDS_intrusion-detection",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 526,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SCH_scheduler",
          "destination": "IAM_identity-access",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 527,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "IAM_identity-access",
          "destination": "SCH_scheduler",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 528,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "IAM_iam-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 529,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "IDS",
      "name": "Intrusion Detection",
      "tier": "security",
      "folder": "ids",
      "policy_set": "ids-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "IDS_tap-network",
          "destination": "IDS_ids-sensors",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "514"
          ],
          "action": "allow",
          "priority": 530,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "IDS_dev-vpn",
          "destination": "IDS_ids-sensors",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 531,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "IDS_ids-sensors",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 532,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "IDS_ids-sensors",
          "destination": "IDS_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 533,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "IDS_integration-bus",
          "destination": "IDS_ids-sensors",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 534,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "IAM_identity-access",
          "destination": "IDS_intrusion-detection",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 535,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "IDS_intrusion-detection",
          "destination": "IAM_identity-access",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 536,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SCM_source-manager",
          "destination": "IDS_intrusion-detection",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 537,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "IDS_intrusion-detection",
          "destination": "SCM_source-manager",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 538,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "IDS_ids-sensors",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 539,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "IMG",
      "name": "Image Service",
      "tier": "app",
      "folder": "img",
      "policy_set": "img-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "IMG_web-tier",
          "destination": "IMG_image-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9000"
          ],
          "action": "allow",
          "priority": 540,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "IMG_corp-admin",
          "destination": "IMG_image-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 541,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "IMG_image-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 542,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "IMG_image-renderer",
          "destination": "IMG_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 543,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "IMG_integration-bus",
          "destination": "IMG_image-renderer",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 544,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "IMP_import-pipeline",
          "destination": "IMG_image-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 545,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "IMG_image-service",
          "destination": "IMP_import-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 546,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SDP_service-desk",
          "destination": "IMG_image-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 547,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "IMG_image-service",
          "destination": "SDP_service-desk",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 548,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "IMG_image-renderer",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 549,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "IMP",
      "name": "Import Pipeline",
      "tier": "batch",
      "folder": "imp",
      "policy_set": "imp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "IMP_partners",
          "destination": "IMP_import-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 550,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "IMP_ops-admin",
          "destination": "IMP_import-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 551,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "IMP_import-workers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 552,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "IMP_import-workers",
          "destination": "IMP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 553,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "IMP_integration-bus",
          "destination": "IMP_import-workers",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 554,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "IMG_image-service",
          "destination": "IMP_import-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 555,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "IMP_import-pipeline",
          "destination": "IMG_image-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 556,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SEC_security-hub",
          "destination": "IMP_import-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 557,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "IMP_import-pipeline",
          "destination": "SEC_security-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 558,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "IMP_import-workers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 559,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "INS",
      "name": "Insights Engine",
      "tier": "analytics",
      "folder": "ins",
      "policy_set": "ins-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "INS_analytics-vpc",
          "destination": "INS_insight-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9092"
          ],
          "action": "allow",
          "priority": 560,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "INS_dev-vpn",
          "destination": "INS_insight-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 561,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "INS_insight-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 562,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "INS_insight-cluster",
          "destination": "INS_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 563,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "INS_integration-bus",
          "destination": "INS_insight-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 564,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "INV_inventory",
          "destination": "INS_insights-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 565,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "INS_insights-engine",
          "destination": "INV_inventory",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 566,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SEM_siem",
          "destination": "INS_insights-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 567,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "INS_insights-engine",
          "destination": "SEM_siem",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 568,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "INS_insight-cluster",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 569,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "INV",
      "name": "Inventory",
      "tier": "app",
      "folder": "inv",
      "policy_set": "inv-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "INV_corp-users",
          "destination": "INV_inventory-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5432"
          ],
          "action": "allow",
          "priority": 570,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "INV_corp-admin",
          "destination": "INV_inventory-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 571,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "INV_inventory-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 572,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "INV_inventory-api",
          "destination": "INV_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 573,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "INV_integration-bus",
          "destination": "INV_inventory-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 574,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "INS_insights-engine",
          "destination": "INV_inventory",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 575,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "INV_inventory",
          "destination": "INS_insights-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 576,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SHP_shipping-api",
          "destination": "INV_inventory",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 577,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "INV_inventory",
          "destination": "SHP_shipping-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 578,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "INV_inventory-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 579,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "IOT",
      "name": "IoT Hub",
      "tier": "edge",
      "folder": "iot",
      "policy_set": "iot-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "IOT_internet",
          "destination": "IOT_iot-broker",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8883"
          ],
          "action": "allow",
          "priority": 580,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "IOT_ops-admin",
          "destination": "IOT_iot-broker",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 581,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "IOT_iot-broker",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 582,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "IOT_iot-broker",
          "destination": "IOT_origin-cluster",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 583,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "IOT_integration-bus",
          "destination": "IOT_iot-broker",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 584,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "KAF_kafka-cluster",
          "destination": "IOT_iot-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 585,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "IOT_iot-hub",
          "destination": "KAF_kafka-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 586,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SIG_signing-service",
          "destination": "IOT_iot-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 587,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "IOT_iot-hub",
          "destination": "SIG_signing-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 588,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "IOT_iot-broker",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 589,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "KAF",
      "name": "Kafka Cluster",
      "tier": "stream",
      "folder": "kaf",
      "policy_set": "kaf-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "KAF_analytics-vpc",
          "destination": "KAF_kafka-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092",
            "9093"
          ],
          "action": "allow",
          "priority": 590,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "KAF_dev-vpn",
          "destination": "KAF_kafka-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 591,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "KAF_kafka-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 592,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "KAF_kafka-brokers",
          "destination": "KAF_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 593,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "KAF_integration-bus",
          "destination": "KAF_kafka-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 594,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "IOT_iot-hub",
          "destination": "KAF_kafka-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 595,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "KAF_kafka-cluster",
          "destination": "IOT_iot-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 596,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "SOC_soc-console",
          "destination": "KAF_kafka-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 597,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "KAF_kafka-cluster",
          "destination": "SOC_soc-console",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 598,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "KAF_kafka-brokers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 599,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "KEY",
      "name": "Key Vault",
      "tier": "security",
      "folder": "key",
      "policy_set": "key-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "KEY_app-tier",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8200"
          ],
          "action": "allow",
          "priority": 600,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "KEY_corp-admin",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 601,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 602,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "KEY_key-vault",
          "destination": "KEY_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 603,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "KEY_integration-bus",
          "destination": "KEY_key-vault",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 604,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "KUB_kubernetes-api",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 605,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "KEY_key-vault",
          "destination": "KUB_kubernetes-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 606,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ACM_access-management",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 607,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "KEY_key-vault",
          "destination": "ACM_access-management",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 608,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "KEY_key-vault",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 609,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "KUB",
      "name": "Kubernetes API",
      "tier": "platform",
      "folder": "kub",
      "policy_set": "kub-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "KUB_ops-admin",
          "destination": "KUB_k8s-control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6443"
          ],
          "action": "allow",
          "priority": 610,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "KUB_ops-admin",
          "destination": "KUB_k8s-control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 611,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "KUB_k8s-control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 612,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "KUB_k8s-control-plane",
          "destination": "KUB_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 613,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "KUB_control-plane",
          "destination": "KUB_k8s-control-plane",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 614,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "KEY_key-vault",
          "destination": "KUB_kubernetes-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 615,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "KUB_kubernetes-api",
          "destination": "KEY_key-vault",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 616,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "API_public-api",
          "destination": "KUB_kubernetes-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 617,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "KUB_kubernetes-api",
          "destination": "API_public-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 618,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "KUB_k8s-control-plane",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 619,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LAB",
      "name": "Lab Platform",
      "tier": "dev",
      "folder": "lab",
      "policy_set": "lab-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LAB_dev-vpn",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 620,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LAB_dev-vpn",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 621,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 622,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LAB_lab-platform",
          "destination": "LAB_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 623,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LAB_integration-bus",
          "destination": "LAB_lab-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 624,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "LDP_ldap-service",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 625,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LAB_lab-platform",
          "destination": "LDP_ldap-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 626,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "APP_application-core",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 627,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LAB_lab-platform",
          "destination": "APP_application-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 628,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LAB_lab-platform",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 629,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LDP",
      "name": "LDAP Service",
      "tier": "identity",
      "folder": "ldp",
      "policy_set": "ldp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LDP_corp-users",
          "destination": "LDP_ldap-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "389",
            "636"
          ],
          "action": "allow",
          "priority": 630,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LDP_corp-admin",
          "destination": "LDP_ldap-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 631,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LDP_ldap-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 632,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LDP_ldap-cluster",
          "destination": "LDP_directory-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 633,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LDP_integration-bus",
          "destination": "LDP_ldap-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 634,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "LAB_lab-platform",
          "destination": "LDP_ldap-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 635,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LDP_ldap-service",
          "destination": "LAB_lab-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 636,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ATH_auth-service",
          "destination": "LDP_ldap-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 637,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LDP_ldap-service",
          "destination": "ATH_auth-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 638,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LDP_ldap-cluster",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 639,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LEG",
      "name": "Legacy Bridge",
      "tier": "integration",
      "folder": "leg",
      "policy_set": "leg-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LEG_app-tier",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 640,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LEG_ops-admin",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 641,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 642,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LEG_legacy-bridge",
          "destination": "LEG_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 643,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LEG_integration-bus",
          "destination": "LEG_legacy-bridge",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 644,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "LOG_log-collector",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 645,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LEG_legacy-bridge",
          "destination": "LOG_log-collector",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 646,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "AUD_audit-platform",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 647,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LEG_legacy-bridge",
          "destination": "AUD_audit-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 648,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LEG_legacy-bridge",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 649,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LOG",
      "name": "Log Collector",
      "tier": "ops",
      "folder": "log",
      "policy_set": "log-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LOG_all-zones",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "514",
            "6514"
          ],
          "action": "allow",
          "priority": 650,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LOG_dev-vpn",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 651,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 652,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LOG_log-collector",
          "destination": "LOG_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 653,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LOG_monitoring-hub",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 654,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "LEG_legacy-bridge",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 655,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LOG_log-collector",
          "destination": "LEG_legacy-bridge",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 656,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "BIL_billing-engine",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 657,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LOG_log-collector",
          "destination": "BIL_billing-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 658,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LOG_log-collector",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 659,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LON",
      "name": "London Hub",
      "tier": "regional",
      "folder": "lon",
      "policy_set": "lon-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LON_corp-users",
          "destination": "LON_lon-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 660,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LON_corp-admin",
          "destination": "LON_lon-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 661,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LON_lon-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 662,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LON_lon-hub",
          "destination": "LON_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 663,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LON_integration-bus",
          "destination": "LON_lon-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 664,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "LST_listing-api",
          "destination": "LON_london-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 665,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LON_london-hub",
          "destination": "LST_listing-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 666,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "BKP_backup-control",
          "destination": "LON_london-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 667,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LON_london-hub",
          "destination": "BKP_backup-control",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 668,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LON_lon-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 669,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "LST",
      "name": "Listing API",
      "tier": "web",
      "folder": "lst",
      "policy_set": "lst-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "LST_internet",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 670,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "LST_ops-admin",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 671,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 672,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "LST_listing-api",
          "destination": "LST_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 673,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "LST_integration-bus",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 674,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "LON_london-hub",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 675,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "LST_listing-api",
          "destination": "LON_london-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 676,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "BUS_business-portal",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 677,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "LST_listing-api",
          "destination": "BUS_business-portal",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 678,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "LST_listing-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 679,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MAI",
      "name": "Mail API",
      "tier": "messaging",
      "folder": "mai",
      "policy_set": "mai-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MAI_app-tier",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "587"
          ],
          "action": "allow",
          "priority": 680,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MAI_dev-vpn",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 681,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 682,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MAI_mail-api",
          "destination": "MAI_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 683,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MAI_message-backbone",
          "destination": "MAI_mail-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 684,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MDM_master-data",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 685,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MAI_mail-api",
          "destination": "MDM_master-data",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 686,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CAD_card-services",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 687,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MAI_mail-api",
          "destination": "CAD_card-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 688,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MAI_mail-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 689,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MDM",
      "name": "Master Data",
      "tier": "data",
      "folder": "mdm",
      "policy_set": "mdm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MDM_corp-users",
          "destination": "MDM_mdm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "1521"
          ],
          "action": "allow",
          "priority": 690,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MDM_corp-admin",
          "destination": "MDM_mdm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 691,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MDM_mdm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 692,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MDM_mdm-core",
          "destination": "MDM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 693,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MDM_integration-bus",
          "destination": "MDM_mdm-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 694,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MAI_mail-api",
          "destination": "MDM_master-data",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 695,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MDM_master-data",
          "destination": "MAI_mail-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 696,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CAS_case-tracking",
          "destination": "MDM_master-data",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 697,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MDM_master-data",
          "destination": "CAS_case-tracking",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 698,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MDM_mdm-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 699,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MED",
      "name": "Media Pipeline",
      "tier": "app",
      "folder": "med",
      "policy_set": "med-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MED_cdn-edge",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9000"
          ],
          "action": "allow",
          "priority": 700,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MED_ops-admin",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 701,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 702,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MED_media-pipeline",
          "destination": "MED_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 703,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MED_integration-bus",
          "destination": "MED_media-pipeline",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 704,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MES_messaging-core",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 705,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MED_media-pipeline",
          "destination": "MES_messaging-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 706,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CHT_chat-gateway",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 707,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MED_media-pipeline",
          "destination": "CHT_chat-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 708,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MED_media-pipeline",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 709,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MES",
      "name": "Messaging Core",
      "tier": "messaging",
      "folder": "mes",
      "policy_set": "mes-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MES_app-tier",
          "destination": "MES_message-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5672"
          ],
          "action": "allow",
          "priority": 710,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MES_dev-vpn",
          "destination": "MES_message-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 711,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MES_message-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 712,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MES_message-core",
          "destination": "MES_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 713,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MES_message-backbone",
          "destination": "MES_message-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 714,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MED_media-pipeline",
          "destination": "MES_messaging-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 715,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MES_messaging-core",
          "destination": "MED_media-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 716,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CIC_ci-control",
          "destination": "MES_messaging-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 717,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MES_messaging-core",
          "destination": "CIC_ci-control",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 718,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MES_message-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 719,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MET",
      "name": "Metrics Gateway",
      "tier": "ops",
      "folder": "met",
      "policy_set": "met-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MET_monitoring",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100",
            "9200"
          ],
          "action": "allow",
          "priority": 720,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MET_corp-admin",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 721,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 722,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MET_metrics-gateway",
          "destination": "MET_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 723,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MET_monitoring-hub",
          "destination": "MET_metrics-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 724,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MFA_mfa-service",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 725,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MET_metrics-gateway",
          "destination": "MFA_mfa-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 726,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CMP_compliance-vault",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 727,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MET_metrics-gateway",
          "destination": "CMP_compliance-vault",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 728,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MET_metrics-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 729,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MFA",
      "name": "MFA Service",
      "tier": "identity",
      "folder": "mfa",
      "policy_set": "mfa-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MFA_internet",
          "destination": "MFA_mfa-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 730,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MFA_ops-admin",
          "destination": "MFA_mfa-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 731,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MFA_mfa-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 732,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MFA_mfa-gateway",
          "destination": "MFA_directory-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 733,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MFA_integration-bus",
          "destination": "MFA_mfa-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 734,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MET_metrics-gateway",
          "destination": "MFA_mfa-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 735,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MFA_mfa-service",
          "destination": "MET_metrics-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 736,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CRM_crm-platform",
          "destination": "MFA_mfa-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 737,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MFA_mfa-service",
          "destination": "CRM_crm-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 738,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MFA_mfa-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 739,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MLP",
      "name": "ML Platform",
      "tier": "analytics",
      "folder": "mlp",
      "policy_set": "mlp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MLP_data-science",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8888"
          ],
          "action": "allow",
          "priority": 740,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MLP_dev-vpn",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 741,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 742,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MLP_ml-platform",
          "destination": "MLP_lakehouse-bus",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 743,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MLP_integration-bus",
          "destination": "MLP_ml-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 744,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "MON_monitoring-suite",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 745,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MLP_ml-platform",
          "destination": "MON_monitoring-suite",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 746,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CSH_cash-ledger",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 747,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MLP_ml-platform",
          "destination": "CSH_cash-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 748,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MLP_ml-platform",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 749,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MON",
      "name": "Monitoring Suite",
      "tier": "ops",
      "folder": "mon",
      "policy_set": "mon-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MON_ops-admin",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9090"
          ],
          "action": "allow",
          "priority": 750,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MON_corp-admin",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 751,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 752,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MON_monitoring-suite",
          "destination": "MON_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 753,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MON_monitoring-hub",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 754,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MLP_ml-platform",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 755,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MON_monitoring-suite",
          "destination": "MLP_ml-platform",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 756,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CTL_control-plane",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 757,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MON_monitoring-suite",
          "destination": "CTL_control-plane",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 758,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MON_monitoring-suite",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 759,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "MQS",
      "name": "Queue Service",
      "tier": "messaging",
      "folder": "mqs",
      "policy_set": "mqs-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "MQS_app-tier",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672",
            "15672"
          ],
          "action": "allow",
          "priority": 760,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "MQS_ops-admin",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 761,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 762,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "MQS_queue-service",
          "destination": "MQS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 763,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "MQS_message-backbone",
          "destination": "MQS_queue-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 764,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "NAT_nat-gateway",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 765,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "MQS_queue-service",
          "destination": "NAT_nat-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 766,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "CUS_customer-hub",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 767,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "MQS_queue-service",
          "destination": "CUS_customer-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 768,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "MQS_queue-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 769,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "NAT",
      "name": "NAT Gateway",
      "tier": "network",
      "folder": "nat",
      "policy_set": "nat-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "NAT_private-subnets",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "80"
          ],
          "action": "allow",
          "priority": 770,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "NAT_dev-vpn",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 771,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 772,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "NAT_nat-gateway",
          "destination": "NAT_core-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 773,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "NAT_integration-bus",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 774,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "MQS_queue-service",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 775,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "NAT_nat-gateway",
          "destination": "MQS_queue-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 776,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "DAS_data-science",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 777,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "NAT_nat-gateway",
          "destination": "DAS_data-science",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 778,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "NAT_nat-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 779,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "NET",
      "name": "Network Core",
      "tier": "network",
      "folder": "net",
      "policy_set": "net-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "NET_ops-admin",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "161"
          ],
          "action": "allow",
          "priority": 780,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "NET_corp-admin",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 781,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 782,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "NET_network-core",
          "destination": "NET_core-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 783,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "NET_integration-bus",
          "destination": "NET_network-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 784,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "NTP_time-service",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 785,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "NET_network-core",
          "destination": "NTP_time-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 786,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "DBA_database-admin",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 787,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "NET_network-core",
          "destination": "DBA_database-admin",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 788,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "NET_network-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 789,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "NTP",
      "name": "Time Service",
      "tier": "core",
      "folder": "ntp",
      "policy_set": "ntp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "NTP_all-zones",
          "destination": "NTP_time-servers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 790,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "NTP_ops-admin",
          "destination": "NTP_time-servers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 791,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "NTP_time-servers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 792,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "NTP_time-servers",
          "destination": "NTP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 793,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "NTP_integration-bus",
          "destination": "NTP_time-servers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 794,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "NET_network-core",
          "destination": "NTP_time-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 795,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "NTP_time-service",
          "destination": "NET_network-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 796,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "DLP_data-loss-prevention",
          "destination": "NTP_time-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 797,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "NTP_time-service",
          "destination": "DLP_data-loss-prevention",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 798,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "NTP_time-servers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 799,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "OBS",
      "name": "Observability",
      "tier": "ops",
      "folder": "obs",
      "policy_set": "obs-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "OBS_app-tier",
          "destination": "OBS_obs-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317",
            "4318"
          ],
          "action": "allow",
          "priority": 800,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "OBS_dev-vpn",
          "destination": "OBS_obs-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 801,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "OBS_obs-stack",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 802,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "OBS_obs-stack",
          "destination": "OBS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 803,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "OBS_monitoring-hub",
          "destination": "OBS_obs-stack",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 804,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "OMS_order-service",
          "destination": "OBS_observability",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 805,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "OBS_observability",
          "destination": "OMS_order-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 806,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "DNS_dns-resolver",
          "destination": "OBS_observability",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 807,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "OBS_observability",
          "destination": "DNS_dns-resolver",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 808,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "OBS_obs-stack",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 809,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "OMS",
      "name": "Order Service",
      "tier": "commerce",
      "folder": "oms",
      "policy_set": "oms-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "OMS_web-tier",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5432"
          ],
          "action": "allow",
          "priority": 810,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "OMS_corp-admin",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 811,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 812,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "OMS_order-service",
          "destination": "OMS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 813,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "OMS_order-mesh",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 814,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "OBS_observability",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 815,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "OMS_order-service",
          "destination": "OBS_observability",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 816,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "DOC_document-service",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 817,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "OMS_order-service",
          "destination": "DOC_document-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 818,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "OMS_order-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 819,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "OPS",
      "name": "Operations Hub",
      "tier": "ops",
      "folder": "ops",
      "policy_set": "ops-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "OPS_ops-admin",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 820,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "OPS_ops-admin",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 821,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 822,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "OPS_operations-hub",
          "destination": "OPS_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 823,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "OPS_monitoring-hub",
          "destination": "OPS_operations-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 824,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "ORC_orchestration",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 825,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "OPS_operations-hub",
          "destination": "ORC_orchestration",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 826,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "EAI_enterprise-integration",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 827,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "OPS_operations-hub",
          "destination": "EAI_enterprise-integration",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 828,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "OPS_operations-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 829,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "ORC",
      "name": "Orchestration",
      "tier": "platform",
      "folder": "orc",
      "policy_set": "orc-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "ORC_ops-admin",
          "destination": "ORC_orchestration-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6443"
          ],
          "action": "allow",
          "priority": 830,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "ORC_dev-vpn",
          "destination": "ORC_orchestration-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 831,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "ORC_orchestration-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 832,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "ORC_orchestration-api",
          "destination": "ORC_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 833,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "ORC_control-plane",
          "destination": "ORC_orchestration-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 834,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "OPS_operations-hub",
          "destination": "ORC_orchestration",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 835,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "ORC_orchestration",
          "destination": "OPS_operations-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 836,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ECM_commerce-engine",
          "destination": "ORC_orchestration",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 837,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "ORC_orchestration",
          "destination": "ECM_commerce-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 838,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "ORC_orchestration-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 839,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PAY",
      "name": "Payments",
      "tier": "finance",
      "folder": "pay",
      "policy_set": "pay-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PAY_internet",
          "destination": "PAY_payments-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 840,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PAY_corp-admin",
          "destination": "PAY_payments-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 841,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PAY_payments-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 842,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PAY_payments-api",
          "destination": "PAY_audit-ledger",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 843,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PAY_integration-bus",
          "destination": "PAY_payments-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 844,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PDF_pdf-renderer",
          "destination": "PAY_payments",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 845,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PAY_payments",
          "destination": "PDF_pdf-renderer",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 846,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "EDI_edi-gateway",
          "destination": "PAY_payments",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 847,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PAY_payments",
          "destination": "EDI_edi-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 848,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PAY_payments-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 849,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PDF",
      "name": "PDF Renderer",
      "tier": "app",
      "folder": "pdf",
      "policy_set": "pdf-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PDF_app-tier",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8081"
          ],
          "action": "allow",
          "priority": 850,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PDF_ops-admin",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 851,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 852,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PDF_pdf-renderer",
          "destination": "PDF_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 853,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PDF_integration-bus",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 854,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PAY_payments",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 855,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PDF_pdf-renderer",
          "destination": "PAY_payments",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 856,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ELK_observability-stack",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 857,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PDF_pdf-renderer",
          "destination": "ELK_observability-stack",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 858,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PDF_pdf-renderer",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 859,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PIM",
      "name": "Product Info",
      "tier": "commerce",
      "folder": "pim",
      "policy_set": "pim-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PIM_corp-users",
          "destination": "PIM_pim-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5432"
          ],
          "action": "allow",
          "priority": 860,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PIM_dev-vpn",
          "destination": "PIM_pim-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 861,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PIM_pim-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 862,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PIM_pim-api",
          "destination": "PIM_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 863,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PIM_order-mesh",
          "destination": "PIM_pim-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 864,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PKI_pki-services",
          "destination": "PIM_product-info",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 865,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PIM_product-info",
          "destination": "PKI_pki-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 866,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "EML_mail-relay",
          "destination": "PIM_product-info",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 867,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PIM_product-info",
          "destination": "EML_mail-relay",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 868,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PIM_pim-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 869,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PKI",
      "name": "PKI Services",
      "tier": "security",
      "folder": "pki",
      "policy_set": "pki-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PKI_corp-users",
          "destination": "PKI_pki-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 870,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PKI_corp-admin",
          "destination": "PKI_pki-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 871,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PKI_pki-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 872,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PKI_pki-service",
          "destination": "PKI_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 873,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PKI_integration-bus",
          "destination": "PKI_pki-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 874,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PIM_product-info",
          "destination": "PKI_pki-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 875,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PKI_pki-services",
          "destination": "PIM_product-info",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 876,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ERP_erp-core",
          "destination": "PKI_pki-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 877,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PKI_pki-services",
          "destination": "ERP_erp-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 878,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PKI_pki-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 879,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PLT",
      "name": "Platform Core",
      "tier": "platform",
      "folder": "plt",
      "policy_set": "plt-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PLT_ops-admin",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6443"
          ],
          "action": "allow",
          "priority": 880,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PLT_ops-admin",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 881,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 882,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PLT_platform-core",
          "destination": "PLT_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 883,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PLT_control-plane",
          "destination": "PLT_platform-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 884,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PRC_pricing-engine",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 885,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PLT_platform-core",
          "destination": "PRC_pricing-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 886,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "ETL_etl-pipeline",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 887,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PLT_platform-core",
          "destination": "ETL_etl-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 888,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PLT_platform-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 889,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PRC",
      "name": "Pricing Engine",
      "tier": "commerce",
      "folder": "prc",
      "policy_set": "prc-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PRC_web-tier",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8080"
          ],
          "action": "allow",
          "priority": 890,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PRC_dev-vpn",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 891,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 892,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PRC_pricing-engine",
          "destination": "PRC_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 893,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PRC_order-mesh",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 894,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PLT_platform-core",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 895,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PRC_pricing-engine",
          "destination": "PLT_platform-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 896,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "EVT_event-bus",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 897,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PRC_pricing-engine",
          "destination": "EVT_event-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 898,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PRC_pricing-engine",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 899,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PRD",
      "name": "Product API",
      "tier": "commerce",
      "folder": "prd",
      "policy_set": "prd-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PRD_internet",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 900,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PRD_corp-admin",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 901,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 902,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PRD_product-api",
          "destination": "PRD_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 903,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PRD_order-mesh",
          "destination": "PRD_product-api",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 904,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "PRX_proxy-fleet",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 905,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PRD_product-api",
          "destination": "PRX_proxy-fleet",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 906,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "EXP_export-service",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 907,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PRD_product-api",
          "destination": "EXP_export-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 908,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PRD_product-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 909,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "PRX",
      "name": "Proxy Fleet",
      "tier": "edge",
      "folder": "prx",
      "policy_set": "prx-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "PRX_internet",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "80",
            "443"
          ],
          "action": "allow",
          "priority": 910,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "PRX_ops-admin",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 911,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 912,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "PRX_proxy-fleet",
          "destination": "PRX_origin-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 913,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "PRX_integration-bus",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 914,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "PRD_product-api",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 915,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "PRX_proxy-fleet",
          "destination": "PRD_product-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 916,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "FED_federation-hub",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 917,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "PRX_proxy-fleet",
          "destination": "FED_federation-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 918,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "PRX_proxy-fleet",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "22/tcp"
          ],
          "action": "deny",
          "priority": 919,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "QAS",
      "name": "QA Services",
      "tier": "qa",
      "folder": "qas",
      "policy_set": "qas-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "QAS_qa-lab",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 920,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "QAS_dev-vpn",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 921,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 922,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "QAS_qa-services",
          "destination": "QAS_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 923,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "QAS_integration-bus",
          "destination": "QAS_qa-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 924,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "QRY_query-engine",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 925,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "QAS_qa-services",
          "destination": "QRY_query-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 926,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "FIL_file-transfer",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 927,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "QAS_qa-services",
          "destination": "FIL_file-transfer",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 928,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "QAS_qa-services",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 929,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "QRY",
      "name": "Query Engine",
      "tier": "analytics",
      "folder": "qry",
      "policy_set": "qry-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "QRY_bi-tools",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8123"
          ],
          "action": "allow",
          "priority": 930,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "QRY_corp-admin",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 931,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 932,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "QRY_query-engine",
          "destination": "QRY_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 933,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "QRY_integration-bus",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 934,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "QAS_qa-services",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 935,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "QRY_query-engine",
          "destination": "QAS_qa-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 936,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "FIN_finance-api",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 937,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "QRY_query-engine",
          "destination": "FIN_finance-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 938,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "QRY_query-engine",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 939,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "QUE",
      "name": "Queue Adapter",
      "tier": "integration",
      "folder": "que",
      "policy_set": "que-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "QUE_app-tier",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5672"
          ],
          "action": "allow",
          "priority": 940,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "QUE_ops-admin",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 941,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 942,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "QUE_queue-adapter",
          "destination": "QUE_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 943,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "QUE_integration-bus",
          "destination": "QUE_queue-adapter",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 944,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "RAB_rabbit-cluster",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 945,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "QUE_queue-adapter",
          "destination": "RAB_rabbit-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 946,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "FRA_fraud-engine",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 947,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "QUE_queue-adapter",
          "destination": "FRA_fraud-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 948,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "QUE_queue-adapter",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 949,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "RAB",
      "name": "Rabbit Cluster",
      "tier": "messaging",
      "folder": "rab",
      "policy_set": "rab-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "RAB_app-tier",
          "destination": "RAB_rabbit-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672",
            "15672"
          ],
          "action": "allow",
          "priority": 950,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "RAB_dev-vpn",
          "destination": "RAB_rabbit-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 951,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "RAB_rabbit-brokers",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 952,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "RAB_rabbit-brokers",
          "destination": "RAB_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 953,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "RAB_message-backbone",
          "destination": "RAB_rabbit-brokers",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 954,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "QUE_queue-adapter",
          "destination": "RAB_rabbit-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 955,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "RAB_rabbit-cluster",
          "destination": "QUE_queue-adapter",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 956,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "GAT_gateway-mesh",
          "destination": "RAB_rabbit-cluster",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 957,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "RAB_rabbit-cluster",
          "destination": "GAT_gateway-mesh",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 958,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "RAB_rabbit-brokers",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 959,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "REC",
      "name": "Recommendation",
      "tier": "analytics",
      "folder": "rec",
      "policy_set": "rec-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "REC_web-tier",
          "destination": "REC_recommendation-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 960,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "REC_corp-admin",
          "destination": "REC_recommendation-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 961,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "REC_recommendation-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 962,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "REC_recommendation-api",
          "destination": "REC_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 963,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "REC_integration-bus",
          "destination": "REC_recommendation-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 964,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "REG_registry",
          "destination": "REC_recommendation",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 965,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "REC_recommendation",
          "destination": "REG_registry",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 966,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "GIT_git-service",
          "destination": "REC_recommendation",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 967,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "REC_recommendation",
          "destination": "GIT_git-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 968,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "REC_recommendation-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 969,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "REG",
      "name": "Registry",
      "tier": "devops",
      "folder": "reg",
      "policy_set": "reg-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "REG_dev-vpn",
          "destination": "REG_container-registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "5000"
          ],
          "action": "allow",
          "priority": 970,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "REG_ops-admin",
          "destination": "REG_container-registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 971,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "REG_container-registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 972,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "REG_container-registry",
          "destination": "REG_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 973,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "REG_integration-bus",
          "destination": "REG_container-registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 974,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "REC_recommendation",
          "destination": "REG_registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 975,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "REG_registry",
          "destination": "REC_recommendation",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 976,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "GOV_governance-api",
          "destination": "REG_registry",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 977,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "REG_registry",
          "destination": "GOV_governance-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 978,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "REG_container-registry",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 979,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "REP",
      "name": "Reporting",
      "tier": "analytics",
      "folder": "rep",
      "policy_set": "rep-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "REP_corp-users",
          "destination": "REP_reporting-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 980,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "REP_dev-vpn",
          "destination": "REP_reporting-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 981,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "REP_reporting-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 982,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "REP_reporting-hub",
          "destination": "REP_lakehouse-bus",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 983,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "REP_integration-bus",
          "destination": "REP_reporting-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 984,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "RIS_risk-engine",
          "destination": "REP_reporting",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 985,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "REP_reporting",
          "destination": "RIS_risk-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 986,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "GRF_graph-service",
          "destination": "REP_reporting",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 987,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "REP_reporting",
          "destination": "GRF_graph-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 988,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "REP_reporting-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "3389/tcp"
          ],
          "action": "deny",
          "priority": 989,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "RIS",
      "name": "Risk Engine",
      "tier": "security",
      "folder": "ris",
      "policy_set": "ris-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "RIS_payment-tier",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 990,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "RIS_corp-admin",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 991,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 992,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "RIS_risk-engine",
          "destination": "RIS_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 993,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "RIS_integration-bus",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 994,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "REP_reporting",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 995,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "RIS_risk-engine",
          "destination": "REP_reporting",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 996,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "HCM_human-capital",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 997,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "RIS_risk-engine",
          "destination": "HCM_human-capital",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 998,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "RIS_risk-engine",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 999,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "RPT",
      "name": "Report Builder",
      "tier": "analytics",
      "folder": "rpt",
      "policy_set": "rpt-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "RPT_corp-users",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 1000,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "RPT_ops-admin",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1001,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 1002,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "RPT_report-builder",
          "destination": "RPT_lakehouse-bus",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 1003,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "RPT_integration-bus",
          "destination": "RPT_report-builder",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 1004,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SAP_sap-gateway",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1005,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "RPT_report-builder",
          "destination": "SAP_sap-gateway",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1006,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "HLP_helpdesk",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1007,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "RPT_report-builder",
          "destination": "HLP_helpdesk",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1008,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "RPT_report-builder",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 1009,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SAP",
      "name": "SAP Gateway",
      "tier": "erp",
      "folder": "sap",
      "policy_set": "sap-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SAP_corp-users",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "3200"
          ],
          "action": "allow",
          "priority": 1010,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SAP_dev-vpn",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1011,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 1012,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SAP_sap-gateway",
          "destination": "SAP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 1013,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SAP_integration-bus",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 1014,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "RPT_report-builder",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 1015,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SAP_sap-gateway",
          "destination": "RPT_report-builder",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 1016,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "HRM_hr-manager",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1017,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SAP_sap-gateway",
          "destination": "HRM_hr-manager",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1018,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SAP_sap-gateway",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 1019,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SCH",
      "name": "Scheduler",
      "tier": "batch",
      "folder": "sch",
      "policy_set": "sch-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SCH_ops-admin",
          "destination": "SCH_scheduler-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "22"
          ],
          "action": "allow",
          "priority": 1020,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SCH_corp-admin",
          "destination": "SCH_scheduler-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1021,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SCH_scheduler-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 1022,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SCH_scheduler-core",
          "destination": "SCH_shared-services",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1023,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SCH_integration-bus",
          "destination": "SCH_scheduler-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1024,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SCM_source-manager",
          "destination": "SCH_scheduler",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 1025,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SCH_scheduler",
          "destination": "SCM_source-manager",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 1026,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "IAM_identity-access",
          "destination": "SCH_scheduler",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 1027,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SCH_scheduler",
          "destination": "IAM_identity-access",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 1028,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SCH_scheduler-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 1029,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SCM",
      "name": "Source Manager",
      "tier": "devops",
      "folder": "scm",
      "policy_set": "scm-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SCM_dev-vpn",
          "destination": "SCM_scm-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1030,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SCM_ops-admin",
          "destination": "SCM_scm-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1031,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SCM_scm-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 1032,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SCM_scm-service",
          "destination": "SCM_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 1033,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SCM_integration-bus",
          "destination": "SCM_scm-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 1034,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SCH_scheduler",
          "destination": "SCM_source-manager",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 1035,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SCM_source-manager",
          "destination": "SCH_scheduler",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 1036,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "IDS_intrusion-detection",
          "destination": "SCM_source-manager",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 1037,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SCM_source-manager",
          "destination": "IDS_intrusion-detection",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 1038,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SCM_scm-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 1039,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SDP",
      "name": "Service Desk",
      "tier": "corp",
      "folder": "sdp",
      "policy_set": "sdp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SDP_corp-users",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1040,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SDP_dev-vpn",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1041,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 1042,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SDP_service-desk",
          "destination": "SDP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "587"
          ],
          "action": "allow",
          "priority": 1043,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SDP_corp-services",
          "destination": "SDP_service-desk",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8200"
          ],
          "action": "allow",
          "priority": 1044,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SEC_security-hub",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 1045,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SDP_service-desk",
          "destination": "SEC_security-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 1046,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "IMG_image-service",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1047,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SDP_service-desk",
          "destination": "IMG_image-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1048,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SDP_service-desk",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 1049,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SEC",
      "name": "Security Hub",
      "tier": "security",
      "folder": "sec",
      "policy_set": "sec-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SEC_ops-admin",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 1050,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SEC_corp-admin",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1051,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9100"
          ],
          "action": "allow",
          "priority": 1052,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SEC_security-hub",
          "destination": "SEC_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 1053,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SEC_integration-bus",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "udp",
          "ports": [
            "4317"
          ],
          "action": "allow",
          "priority": 1054,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SDP_service-desk",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1055,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SEC_security-hub",
          "destination": "SDP_service-desk",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1056,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "IMP_import-pipeline",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1057,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SEC_security-hub",
          "destination": "IMP_import-pipeline",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1058,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SEC_security-hub",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 1059,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SEM",
      "name": "SIEM",
      "tier": "security",
      "folder": "sem",
      "policy_set": "sem-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SEM_all-zones",
          "destination": "SEM_siem-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "6514"
          ],
          "action": "allow",
          "priority": 1060,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SEM_ops-admin",
          "destination": "SEM_siem-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1061,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SEM_siem-core",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9101"
          ],
          "action": "allow",
          "priority": 1062,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SEM_siem-core",
          "destination": "SEM_siem-core",
          "direction": "egress",
          "protocol": "udp",
          "ports": [
            "53"
          ],
          "action": "allow",
          "priority": 1063,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SEM_integration-bus",
          "destination": "SEM_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5060"
          ],
          "action": "allow",
          "priority": 1064,
          "enabled": false
        },
        {
          "name": "allow-trigram-peer",
          "source": "SHP_shipping-api",
          "destination": "SEM_siem",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 1065,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SEM_siem",
          "destination": "SHP_shipping-api",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "8443"
          ],
          "action": "allow",
          "priority": 1066,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "INS_insights-engine",
          "destination": "SEM_siem",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 1067,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SEM_siem",
          "destination": "INS_insights-engine",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3306"
          ],
          "action": "deny",
          "priority": 1068,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SEM_siem-core",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 1069,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SHP",
      "name": "Shipping API",
      "tier": "commerce",
      "folder": "shp",
      "policy_set": "shp-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SHP_web-tier",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "8443"
          ],
          "action": "allow",
          "priority": 1070,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SHP_dev-vpn",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1071,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9102"
          ],
          "action": "allow",
          "priority": 1072,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SHP_shipping-api",
          "destination": "SHP_shared-services",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "123"
          ],
          "action": "allow",
          "priority": 1073,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SHP_order-mesh",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "1521"
          ],
          "action": "allow",
          "priority": 1074,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SEM_siem",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 1075,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SHP_shipping-api",
          "destination": "SEM_siem",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5432"
          ],
          "action": "allow",
          "priority": 1076,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "INV_inventory",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 1077,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SHP_shipping-api",
          "destination": "INV_inventory",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "3389"
          ],
          "action": "deny",
          "priority": 1078,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SHP_shipping-api",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "25/tcp"
          ],
          "action": "deny",
          "priority": 1079,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SIG",
      "name": "Signing Service",
      "tier": "security",
      "folder": "sig",
      "policy_set": "sig-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SIG_app-tier",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443",
            "9443"
          ],
          "action": "allow",
          "priority": 1080,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SIG_corp-admin",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1081,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9103"
          ],
          "action": "allow",
          "priority": 1082,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SIG_signing-service",
          "destination": "SIG_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1083,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SIG_integration-bus",
          "destination": "SIG_signing-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "161"
          ],
          "action": "allow",
          "priority": 1084,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SOC_soc-console",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 1085,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SIG_signing-service",
          "destination": "SOC_soc-console",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "5672"
          ],
          "action": "allow",
          "priority": 1086,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "IOT_iot-hub",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1087,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SIG_signing-service",
          "destination": "IOT_iot-hub",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "22"
          ],
          "action": "deny",
          "priority": 1088,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SIG_signing-service",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "80/tcp"
          ],
          "action": "deny",
          "priority": 1089,
          "enabled": true
        }
      ]
    },
    {
      "trigram": "SOC",
      "name": "SOC Console",
      "tier": "security",
      "folder": "soc",
      "policy_set": "soc-default",
      "default_action": "deny",
      "rules": [
        {
          "name": "allow-primary",
          "source": "SOC_ops-admin",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1090,
          "enabled": true
        },
        {
          "name": "allow-ops",
          "source": "SOC_ops-admin",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "22",
            "443"
          ],
          "action": "allow",
          "priority": 1091,
          "enabled": true
        },
        {
          "name": "allow-observability",
          "source": "MON_monitoring",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9104"
          ],
          "action": "allow",
          "priority": 1092,
          "enabled": true
        },
        {
          "name": "allow-egress-service",
          "source": "SOC_soc-console",
          "destination": "SOC_siem-core",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "514"
          ],
          "action": "allow",
          "priority": 1093,
          "enabled": true
        },
        {
          "name": "allow-sync",
          "source": "SOC_integration-bus",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "443"
          ],
          "action": "allow",
          "priority": 1094,
          "enabled": true
        },
        {
          "name": "allow-trigram-peer",
          "source": "SIG_signing-service",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 1095,
          "enabled": true
        },
        {
          "name": "allow-outbound-trigram",
          "source": "SOC_soc-console",
          "destination": "SIG_signing-service",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "9092"
          ],
          "action": "allow",
          "priority": 1096,
          "enabled": true
        },
        {
          "name": "deny-trigram-peer",
          "source": "KAF_kafka-cluster",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1097,
          "enabled": true
        },
        {
          "name": "deny-outbound-trigram",
          "source": "SOC_soc-console",
          "destination": "KAF_kafka-cluster",
          "direction": "egress",
          "protocol": "tcp",
          "ports": [
            "25"
          ],
          "action": "deny",
          "priority": 1098,
          "enabled": true
        },
        {
          "name": "deny-legacy",
          "source": "ANY_any",
          "destination": "SOC_soc-console",
          "direction": "ingress",
          "protocol": "any",
          "ports": [
            "23/tcp"
          ],
          "action": "deny",
          "priority": 1099,
          "enabled": true
        }
      ]
    }
  ]
};
