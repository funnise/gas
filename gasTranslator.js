function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name = "Translator";
  var bot_icon = "http://johnny-fan.com/wp-content/uploads/2015/09/default_719a78ed9aa6749bf6c3dc61ccfe9e89.jpg";
  
  var verify_token = "*****";
  
  //authentication 
 if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  }
  //here I write down query from slack and pick up the value(actually, you need not to do like that)******
  //スプレッドシートの読み込む
  var spreadsheet = SpreadsheetApp.openById('******');
  //シートの読み込み
  var sheet = spreadsheet.getSheetByName('***');
  sheet.getRange(1,1).setValue(array[0]);
  sheet.getRange(1,2).setValue(array[1]);
  sheet.getRange(1,3).setValue(array[2]);
  var query = e.parameter.text.slice(3);
  var array = query.split("/")
  //original language
  var origin_la = array[0]
  //translate language
  var translate_la= array[1]
  //text 
  var text = array[2]
　//finish get the value*********

  
  //requesting slack channel 
  var channel = e.parameter.channel_name
  sheet.getRange(1,5).setValue(channel);
  
  var app = SlackApp.create(token);
  
   //translate
  var result = LanguageApp.translate(text, origin_la, translate_la);
  sheet.getRange(1,4).setValue(result);
  var message = result;

  //return to requesting slack channel
  return app.postMessage("#"+ channel, message, {
    username: bot_name,
    icon_url: bot_icon
  });
 
}