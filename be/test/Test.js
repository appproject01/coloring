function Test101() {
  const result = new GoogleDatabaseService().getSearchPuzzleById('B-1001-L-1-100');
  const a = 1;
}


function Test102() {
  const result = new GoogleDatabaseService().getImageById('image_files3/D-4-6.jpg');
  const a = 1;
}


function Test103() {
  const result = new GoogleDatabaseService().findSearchPuzzles('100', "", 0, 25);
  const a = 1;
}
