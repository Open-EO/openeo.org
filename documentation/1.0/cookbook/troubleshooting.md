# Troubleshooting

Only a collection for now.

- is the result properly saved?
- what is actually in the result? does it contain too many timesteps or bands? has the result been aggregated?
- have bands been renamed or are you trying to merge three cubes that all have the same band name? (of course monthly aggregation usuall done diffrently (agg_temp))
- parameters that are named dependent on back-end: collection name, exact band name, output format (?)
- js seems specific about input naming in `new Formula()`, so be carefule with `data` (datacube) and `x` (number)