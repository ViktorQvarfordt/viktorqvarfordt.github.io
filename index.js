function obfuscationToPlaintext(obfuscatedString) {
  var result = '';
  var chars = obfuscatedString.split('.');
  for (var i = 0; i < chars.length; i++) {
    result += String.fromCharCode(chars[i]/(1+i%7));
  }
  return result;
}

var obfuscatedMails = ["118.210.321.464.555.684.322.113.236.291.456.510.666.798.100.232.192.412.545.582.735.108.92.297.444.545", "118.210.321.464.555.684.448.109.194.348.416.230.690.819.46.230.303"];

for (var i = 0; i < obfuscatedMails.length; i++) {
  var mail = obfuscationToPlaintext(obfuscatedMails[i]);
  document.getElementById('mail-' + i).outerHTML = '<a href="mailto:'+mail+'">'+mail+'</a>';
}
