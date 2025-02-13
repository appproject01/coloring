class GoogleDatabaseService {
  constructor() {
    // Initialize sheetId from script properties
    this.drawingSheetId = new EnvironmentVariablesService().getVariable('drawingSheetId');
    this.sudokuSheetId = new EnvironmentVariablesService().getVariable('sudokuSheetId');
    this.searchpuzzleSheetId = new EnvironmentVariablesService().getVariable('searchpuzzleSheetId');
    this.worksheetName = 'DB';
  }

  getDrawingById(idValue) {

    const searchColumnIndex = "A:A";
    const startStepsColumnIndex = 5;
    const stepIncrement = 1;
    const sheet = SpreadsheetApp.openById(this.drawingSheetId).getSheetByName(this.worksheetName);
    const searchRange = sheet.getRange(searchColumnIndex);
    const searchResult = searchRange.createTextFinder(idValue).matchCase(true).matchEntireCell(true).findNext();

    if (searchResult) {
      const row1 = searchResult.getRow();
      const lastColumn = sheet.getLastColumn();
      const rowData = sheet.getRange(row1, 1, 1, lastColumn).getValues()[0];
      const headerData = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
      let obj = {};

      for (let j = 0; j < startStepsColumnIndex; j++) {
        obj[headerData[j]] = rowData[j];
      }

      let stepData = [];
      let stepNo = 1;

      for (let j = startStepsColumnIndex; j < headerData.length - 1; j = j + stepIncrement) {
        let stepObj = {};
        if (rowData[j].toString().trim().length == 0) {
          break;
        }
        stepObj["id"] = stepNo;
        stepObj["image"] = rowData[j];
        stepData.push(stepObj);
        stepNo++;
      }

      obj["steps"] = stepData;

      return obj;

    } else {
      return {};
    }

  }

  findDrawing(query, book, offset, limit) {

    let likeQuery = "";
    let qOffset = offset.toString();
    let qLimit = limit.toString();
    if (query.length > 0 || book.length > 0) {
      if (query.length > 0) {
        likeQuery = ' where (B like \'%' + query + '%\')';
        if (book.length > 0) {
          likeQuery = likeQuery + ' and (C = \'' + book + '\')';
        }
      } else {
        likeQuery = ' where (C = \'' + book + '\')';
      }
    }
    let query1 = 'Select A, B, C, D' + likeQuery + ' Order by A Asc Limit ' + qLimit + ' Offset ' + qOffset;
    let finQuery = encodeURIComponent(query1);
    let webAppUrl = 'https://spreadsheets.google.com/tq?tqx=out:csv&tq=' + finQuery + '&key=' + this.drawingSheetId + '&gid=0&headers=1';

    let token = ScriptApp.getOAuthToken();

    let options = {
      'method': 'get',
      'headers': {
        'Authorization': 'Bearer ' + token
      },
      'muteHttpExceptions': true
    };

    let response = UrlFetchApp.fetch(webAppUrl, options);
    let values = Utilities.parseCsv(response.getContentText());

    let data = [];

    for (let i = 1; i < values.length; i++) {
      let row = values[i];
      let header = values[0];
      let obj = {};

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }

      data.push(obj);
    }
    return data;
  }


  //////////////////////////////////////////////////////////////////
  getSudokuById(idValue) {

    let searchCoulumnIndex = "A:A";
    let startStepsColumnIndex = 5;
    let sheet = SpreadsheetApp.openById(this.sudokuSheetId).getSheetByName(this.worksheetName);
    let searchRange = sheet.getRange(searchCoulumnIndex);
    let searchResult = searchRange.createTextFinder(idValue).matchCase(true).matchEntireCell(true).findNext();

    if (searchResult) {
      let row1 = searchResult.getRow();
      let lastColumn = sheet.getLastColumn();
      let rowData = sheet.getRange(row1, 1, 1, lastColumn).getValues()[0];
      let headerData = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
      let obj = {};

      for (let j = 0; j < startStepsColumnIndex; j++) {
        obj[headerData[j]] = rowData[j];
      }

      let stepData = [];
      let stepNo = 1;

      for (let j = startStepsColumnIndex; j < headerData.length - 1; j = j + 2) {
        let stepObj = {};
        if (rowData[j].toString().trim().length == 0) {
          break;
        }
        stepObj["id"] = stepNo;
        stepObj["image"] = rowData[j];
        stepObj["explanation"] = rowData[j + 1];
        stepData.push(stepObj);
        stepNo++;
      }

      obj["steps"] = stepData;

      return obj;

    } else {
      return {};
    }
  }

  findSudoku(query, book, offset, limit) {

    let likeQuery = "";
    let qOffset = offset.toString();
    let qLimit = limit.toString();
    if (query.length > 0 || book.length > 0) {
      if (query.length > 0) {
        likeQuery = ' where (B like \'%' + query + '%\')';
        if (book.length > 0) {
          likeQuery = likeQuery + ' and (C = \'' + book + '\')';
        }
      } else {
        likeQuery = ' where (C = \'' + book + '\')';
      }


    }
    let query1 = 'Select A, B, C, D' + likeQuery + ' Order by A Asc Limit ' + qLimit + ' Offset ' + qOffset;

    let finQuery = encodeURIComponent(query1);
    let webAppUrl = 'https://spreadsheets.google.com/tq?tqx=out:csv&tq=' + finQuery + '&key=' + this.sudokuSheetId + '&gid=0&headers=1';

    let token = ScriptApp.getOAuthToken();

    let options = {
      'method': 'get',
      'headers': {
        'Authorization': 'Bearer ' + token
      },
      'muteHttpExceptions': true
    };

    let response = UrlFetchApp.fetch(webAppUrl, options);

    let values = Utilities.parseCsv(response.getContentText());

    let data = [];

    for (let i = 1; i < values.length; i++) {
      let row = values[i];
      let header = values[0];
      let obj = {};

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }

      data.push(obj);
    }

    return data;
  }

  ///////////////////////////////////////////
  findSearchPuzzles(query, book, type, offset, limit) {

    let likeQuery = "";
    let queryStr = "";
    let bookStr = "";
    let typeStr = "";
    let qOffset = offset.toString();
    let qLimit = limit.toString();

    if (query.length > 0) {
      queryStr = ' and (B like \'%' + query + '%\')';
    }

    if (book.length > 0) {
      bookStr = ' and (C = \'' + book + '\')';
    }

    if (type.length > 0) {
      typeStr = ' and (D = \'' + type + '\')';
    }

    likeQuery = queryStr + bookStr + typeStr;

    if (likeQuery.length > 0) {
      likeQuery = ' where' + likeQuery.substring(4);
    }


    let query1 = 'Select A, B, C, D, E' + likeQuery + ' Order by A Asc Limit ' + qLimit + ' Offset ' + qOffset;

    let finQuery = encodeURIComponent(query1);

    let webAppUrl = 'https://spreadsheets.google.com/tq?tqx=out:csv&tq=' + finQuery + '&key=' + this.searchpuzzleSheetId + '&gid=0&headers=1';

    let token = ScriptApp.getOAuthToken();

    let options = {
      'method': 'get',
      'headers': {
        'Authorization': 'Bearer ' + token
      },
      'muteHttpExceptions': true
    };

    let response = UrlFetchApp.fetch(webAppUrl, options);
    let values = Utilities.parseCsv(response.getContentText());
    let data = [];

    for (let i = 1; i < values.length; i++) {
      let row = values[i];
      let header = values[0];
      let obj = {};

      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }

      data.push(obj);
    }
    return data;
  }

  getSearchPuzzleById(idValue) {

    let searchCoulumnIndex = "A:A";
    let startStepsColumnIndex = 5;
    let sheet = SpreadsheetApp.openById(this.searchpuzzleSheetId).getSheetByName(this.worksheetName);
    let searchRange = sheet.getRange(searchCoulumnIndex);
    let searchResult = searchRange.createTextFinder(idValue).matchCase(true).matchEntireCell(true).findNext();


    if (searchResult) {
      let row1 = searchResult.getRow();
      let lastColumn = sheet.getLastColumn();
      let rowData = sheet.getRange(row1, 1, 1, lastColumn).getValues()[0];
      let headerData = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
      let obj = {};

      for (let j = 0; j < startStepsColumnIndex; j++) {
        obj[headerData[j]] = rowData[j];
      }

      let stepData = [];

      let stepNo = 1;

      for (let j = startStepsColumnIndex; j < headerData.length - 1; j = j + 3) {
        let stepObj = {};
        if (rowData[j].toString().trim().length == 0) {
          break;
        }
        stepObj["id"] = stepNo;
        stepObj["image"] = rowData[j];
        stepObj["title"] = rowData[j + 1].toString();
        stepObj["explanation"] = rowData[j + 2];
        stepData.push(stepObj);
        stepNo++;
      }

      obj["steps"] = stepData;
      return obj;

    } else {
      return {};
    }
  }

  //////////////////////////////////////////////////////
  getImageById(idValue) {

    const file = DriveApp.getFileById(this.getFileIdByPath(idValue.trim()));
    const filename = file.getName();
    const base64 = Utilities.base64Encode(file.getBlob().getBytes());
    const obj = {
      id: idValue,
      name: filename,
      image: base64
    };
    return obj;
  }


  getFileIdByPath(path) {
    var names = path.split("/");
    var folder = DriveApp.getRootFolder();

    for (var i = 0; i < names.length; i++) {
      var files = folder.getFilesByName(names[i]);
      var folders = folder.getFoldersByName(names[i]);

      if (files.hasNext()) {
        folder = files.next();
      } else if (folders.hasNext()) {
        folder = folders.next();
      } else {
        throw new Error("File or folder not found: " + path);
      }
    }

    return folder.getId();
  }

}