/**
 * ЗОРКИЙ — приём заявок с сайта.
 * Пишет каждую заявку строкой в Google-таблицу и дублирует письмом на почту компании.
 *
 * УСТАНОВКА (5 минут, делается один раз):
 *  1. Создайте Google-таблицу, назовите лист «Заявки».
 *  2. В таблице: Расширения → Apps Script. Удалите пример, вставьте этот файл целиком.
 *  3. Впишите свою почту в NOTIFY_EMAIL ниже (уже стоит info@vidzhio.ru).
 *  4. Развернуть → Новое развёртывание → тип «Веб-приложение»:
 *       «Запуск от имени» — От моего имени;
 *       «У кого есть доступ» — У всех.
 *     Нажмите «Развернуть», разрешите доступ, скопируйте URL вида
 *     https://script.google.com/macros/s/AKfy.../exec
 *  5. Передайте этот URL разработчику (переменная NEXT_PUBLIC_LEAD_WEBHOOK) — и заявки пойдут.
 *
 * ВАЖНО: после любой правки кода нужно выпустить НОВУЮ версию развёртывания,
 * иначе сайт продолжит обращаться к старой.
 */

var SHEET_NAME = "Заявки";
var NOTIFY_EMAIL = "info@vidzhio.ru";
var COMPANY = "ЗОРКИЙ";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    saveToSheet_(data);
    notify_(data);
    return json_({ ok: true });
  } catch (err) {
    // Пишем ошибку в таблицу-лог, чтобы заявка не потерялась молча
    try {
      logError_(err, e && e.postData ? e.postData.contents : "");
    } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, service: COMPANY + " lead endpoint" });
}

/** Добавляет строку; если в заявке появились новые поля — добавляет колонки автоматически */
function saveToSheet_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  var row = { "Дата и время": formatDate_(new Date()) };
  Object.keys(data).forEach(function (k) {
    if (k === "ts") return;
    var v = data[k];
    if (v === null || v === undefined || v === "") return;
    row[k] = String(v);
  });

  var headers = [];
  if (sheet.getLastRow() > 0) {
    headers = sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0].filter(String);
  }
  Object.keys(row).forEach(function (k) {
    if (headers.indexOf(k) === -1) headers.push(k);
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);

  var values = headers.map(function (h) {
    return row[h] === undefined ? "" : row[h];
  });
  sheet.appendRow(values);
  sheet.autoResizeColumns(1, Math.min(headers.length, 12));
}

/** Письмо с заявкой на почту компании */
function notify_(data) {
  var subject =
    "Заявка с сайта " + COMPANY + ": " + (data["Имя"] || "без имени") + " — " + (data["Телефон"] || "");

  var rows = Object.keys(data)
    .filter(function (k) {
      return k !== "ts" && data[k] !== "" && data[k] !== null && data[k] !== undefined;
    })
    .map(function (k) {
      return (
        '<tr><td style="padding:6px 14px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">' +
        escape_(k) +
        '</td><td style="padding:6px 0;color:#0e1421;font-weight:600">' +
        escape_(String(data[k])) +
        "</td></tr>"
      );
    })
    .join("");

  var phone = String(data["Телефон"] || "").replace(/\D/g, "");
  var buttons = phone
    ? '<p style="margin:18px 0 0"><a href="tel:+' +
      phone +
      '" style="background:#00D68F;color:#080B12;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block">Позвонить</a>&nbsp;&nbsp;' +
      '<a href="https://wa.me/' +
      phone +
      '" style="background:#25D366;color:#08140C;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700;display:inline-block">WhatsApp</a></p>'
    : "";

  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">' +
    '<h2 style="margin:0 0 4px;color:#0e1421">Новая заявка с сайта</h2>' +
    '<p style="margin:0 0 16px;color:#6b7280;font-size:13px">' +
    formatDate_(new Date()) +
    " · перезвоните в течение 15 минут</p>" +
    '<table style="border-collapse:collapse;font-size:14px">' +
    rows +
    "</table>" +
    buttons +
    "</div>";

  MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, htmlBody: html, name: COMPANY + " · сайт" });
}

function logError_(err, raw) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Ошибки") || ss.insertSheet("Ошибки");
  sheet.appendRow([formatDate_(new Date()), String(err), String(raw).slice(0, 4000)]);
}

function formatDate_(d) {
  return Utilities.formatDate(d, "Europe/Moscow", "dd.MM.yyyy HH:mm:ss");
}

function escape_(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Запустите вручную один раз, чтобы проверить таблицу и письмо */
function testLead() {
  var demo = {
    Форма: "test",
    Заголовок: "Тестовая заявка",
    Имя: "Тест",
    Телефон: "+7 (925) 127-91-13",
    Объект: "Частный дом / дача",
    Согласие: "да, " + formatDate_(new Date()),
  };
  saveToSheet_(demo);
  notify_(demo);
}
