midi2zmq
========

Try the following config:
```
[tank]
plugin_phantom=
plugin_ShellExec=Tank/Plugins/ShellExec.py
plugin_aggreg=Tank/Plugins/Aggregator.py
plugin_autostop=Tank/Plugins/Autostop.py
plugin_monitoring=Tank/Plugins/Monitoring.py
plugin_console=Tank/Plugins/ConsoleOnline.py
plugin_bfg=Tank/Plugins/BFG.py
plugin_web=Tank/Plugins/OnlineReport.py
plugin_rcassert=Tank/Plugins/RCAssert.py
plugin_report=Tank/Plugins/Report.py

[bfg]
gun_type=http
zmq=1
uris=/
instances=2
threads=2
result_cache_size=2

[http_gun]
base_address=http://example.org/

[console]
short_only=1

[monitoring]
config=none

[autostop]
autostop=limit(1m)
```
