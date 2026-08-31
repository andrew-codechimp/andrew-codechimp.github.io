---
title: 'Hive Local Thermostat'
description: ''
appImg: 'ha-hive-local-thermostat.png'
storeUrl: 'https://github.com/andrew-codechimp/HA-Hive-Local-Thermostat'
storeText: 'View on GitHub'
installUrl: 'https://my.home-assistant.io/redirect/hacs_repository/?owner=andrew-codechimp&repository=HA-Hive-Local-Thermostat&category=Integration'
installText: 'Install via HACS'
exclude: true
category: 'ha-integrations'
order: 99
---

Local Hive Thermostat MQTT integration for Home Assistant.

Zigbee2MQTT will expose the native sensors but Hive requires specific message structures to be sent for setting modes and a combination of sensor values to determine the modes, this integration creates controls and sensors that correctly interface with the native Hive values/methods.
