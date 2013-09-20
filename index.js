function obfuscationToPlaintext(obfuscatedString) {
  var result = '';
  l = obfuscatedString.split('.')
  for (var i = 0; i < l.length; i++) {
    result += String.fromCharCode(l[i]/(1+i%7));
  }
  return result;
}

var obfuscatedMails = ["118.210.321.464.555.684.322.113.236.291.456.510.666.798.100.232.192.412.545.582.735.108.92.297.444.545", "118.210.321.464.555.684.448.109.194.348.416.230.690.819.46.230.303"];

for (var i = 0; i <= 1; i++) {
  var mail = obfuscationToPlaintext(obfuscatedMails[i]);
  console.log(mail);
  document.getElementById('mail-' + i).outerHTML = '<a href="mailto:'+mail+'">'+mail+'</a>';
}
