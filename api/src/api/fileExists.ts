import fs from 'fs';

export function fileExists(path: string) {
    // fs.exists(SCHEDULE_FILE_PATH, function(exists) {
    return fs.existsSync(path);
}