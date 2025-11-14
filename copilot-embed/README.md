copilot-embed helper

This folder is provided to help you keep exported series JSON files inside the project.

How to use:

1. In the player `Embed` tab click "Download Series JSON" for the series you want to export.
2. Move the downloaded JSON file into this `copilot-embed` folder.
3. Run the helper script to import/copy the file into this folder with a sanitized filename:

   ```
   node import-playlist.js path/to/Series_Name.json
   ```

The script will write a sanitized copy named `Series_Name.json` into this folder. You can commit these files to your repository so they live with your project.

Notes:
- The player itself runs in the browser and cannot directly write files into the project. The download + helper script gives you a workflow to persist series files in the repo.
- You can modify the script to integrate with any server or CI pipeline if you want automatic imports.
