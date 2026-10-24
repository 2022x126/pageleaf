import { resolveLanguage } from './i18n.js';

// A fictional plan lets people try marking and note-taking on useful, concrete text.
const examples = {
  en: {
    title: 'Getting ready for a Saturday book meetup',
    intro: 'This is a made-up plan. Select a sentence and try Highlight or Wavy underline. You can also use the pen to circle something you need to do.',
    sections: [
      ['Confirm the time and place', 'Confirm the room for Saturday afternoon by Friday, then send everyone the meeting point and start time.'],
      ['Prepare what you need', 'Each person brings one book they want to share. The host prepares pens, paper and a timer.'],
      ['Share the jobs', 'Alex checks the room, Sam keeps the sign-up list, and Noor prepares the welcome table. After the meetup, send the group a list of the books people recommended.'],
    ],
    checklist: ['Confirm the room by Friday.', 'Tell everyone where and when to meet.', 'Send the book list after the meetup.'],
    checklistTitle: 'Three things to remember',
  },
  'zh-CN': {
    title: '周末读书会，提前准备什么？',
    intro: '这是一个虚构的活动安排。选中下面的一句话，试试“标重点”或“波浪线”。也可以打开画笔，圈出你要做的事。',
    sections: [
      ['先定时间和地点', '周五前确认周六下午读书会的场地，再把集合地点和开始时间发给大家。'],
      ['要带些什么', '每人带一本想分享的书。主持人准备纸、笔和计时器。'],
      ['把事情分给具体的人', 'Alex 负责确认场地，Sam 整理报名名单，Noor 准备签到表。活动结束后，把大家推荐的书单发到群里。'],
    ],
    checklist: ['周五前确认场地。', '把时间和地点告诉参加的人。', '结束后把推荐书单发给大家。'],
    checklistTitle: '记住这三件事',
  },
  es: {
    title: 'Qué preparar para un encuentro de lectura',
    intro: 'Este plan es ficticio. Selecciona una frase y prueba Resaltar o Línea ondulada. También puedes usar el lápiz para rodear una tarea.',
    sections: [
      ['Confirmar la hora y el lugar', 'Confirma antes del viernes la sala para el sábado por la tarde y envía a todos el punto de encuentro y la hora.'],
      ['Preparar lo necesario', 'Cada persona trae un libro que quiera compartir. Quien organiza prepara papel, bolígrafos y un temporizador.'],
      ['Repartir las tareas', 'Alex confirma la sala, Sam lleva la lista de participantes y Noor prepara la mesa de bienvenida. Después del encuentro, envía al grupo la lista de libros recomendados.'],
    ],
    checklist: ['Confirmar la sala antes del viernes.', 'Comunicar la hora y el lugar.', 'Enviar la lista de libros al terminar.'],
    checklistTitle: 'Tres cosas que recordar',
  },
  fr: {
    title: 'Préparer une rencontre autour des livres',
    intro: 'Ce programme est fictif. Sélectionnez une phrase pour essayer Surligner ou Ligne ondulée. Le stylo permet aussi d’entourer une tâche.',
    sections: [
      ['Confirmer l’heure et le lieu', 'Confirmez avant vendredi la salle pour samedi après-midi, puis envoyez le lieu et l’heure à tout le monde.'],
      ['Préparer le matériel', 'Chaque personne apporte un livre à présenter. La personne qui organise prépare du papier, des stylos et un minuteur.'],
      ['Répartir les tâches', 'Alex confirme la salle, Sam tient la liste des participants et Noor prépare l’accueil. Après la rencontre, envoyez au groupe la liste des livres recommandés.'],
    ],
    checklist: ['Confirmer la salle avant vendredi.', 'Envoyer l’heure et le lieu aux participants.', 'Partager la liste des livres après la rencontre.'],
    checklistTitle: 'Trois choses à retenir',
  },
  de: {
    title: 'Ein Büchertreffen am Samstag vorbereiten',
    intro: 'Dieser Plan ist erfunden. Einen Satz auswählen und Markieren oder Wellenlinie ausprobieren. Mit dem Stift lassen sich Aufgaben einkreisen.',
    sections: [
      ['Zeit und Ort klären', 'Den Raum für Samstagnachmittag bis Freitag bestätigen lassen und allen den Treffpunkt und die Uhrzeit schicken.'],
      ['Material vorbereiten', 'Alle bringen ein Buch mit, das sie vorstellen möchten. Die Person, die das Treffen leitet, bereitet Papier, Stifte und einen Timer vor.'],
      ['Aufgaben verteilen', 'Alex klärt den Raum, Sam führt die Anmeldeliste und Noor bereitet den Empfang vor. Nach dem Treffen erhält die Gruppe eine Liste der empfohlenen Bücher.'],
    ],
    checklist: ['Den Raum bis Freitag bestätigen lassen.', 'Zeit und Treffpunkt mitteilen.', 'Danach die Bücherliste verschicken.'],
    checklistTitle: 'Drei Dinge, an die man denken sollte',
  },
  ja: {
    title: '週末の読書会、何を準備する？',
    intro: 'これは架空の予定です。文章を選んで「マーカー」や「波線」を試してください。ペンで、やることを丸で囲むこともできます。',
    sections: [
      ['日時と場所を決める', '金曜までに土曜の午後に使う会場を確認し、集合場所と開始時刻を参加者に伝えます。'],
      ['持ち物を用意する', '参加者は紹介したい本を一冊持ってきます。進行役は紙、ペン、タイマーを用意します。'],
      ['担当を決める', 'Alex は会場の確認、Sam は参加者名簿、Noor は受付を担当します。終了後、紹介された本の一覧をみんなに送ります。'],
    ],
    checklist: ['金曜までに会場を確認する。', '日時と集合場所を伝える。', '終了後に本の一覧を送る。'],
    checklistTitle: '忘れずにやる三つのこと',
  },
  ar: {
    title: 'الاستعداد للقاء قراءة يوم السبت',
    intro: 'هذه خطة خيالية. حدّد جملة وجرّب التمييز أو الخط المتموّج. ويمكنك استخدام القلم لوضع دائرة حول مهمة تريد إنجازها.',
    sections: [
      ['تأكيد الموعد والمكان', 'أكّد قبل الجمعة حجز القاعة لعصر السبت، ثم أرسل للجميع مكان التجمع ووقت البدء.'],
      ['تجهيز المطلوب', 'يحضر كل شخص كتابًا يريد مشاركته. ويجهّز المنظّم الورق والأقلام ومؤقّتًا.'],
      ['توزيع المهام', 'يتأكد Alex من القاعة، ويعدّ Sam قائمة المشاركين، ويجهّز Noor طاولة الاستقبال. بعد اللقاء، أرسل للمجموعة قائمة الكتب التي أوصى بها المشاركون.'],
    ],
    checklist: ['تأكيد القاعة قبل الجمعة.', 'إبلاغ المشاركين بالوقت والمكان.', 'إرسال قائمة الكتب بعد اللقاء.'],
    checklistTitle: 'ثلاث مهام لا تنسها',
  },
};

const html = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function demoArticle(locale = 'en') {
  const lang = resolveLanguage(locale);
  const example = examples[lang];
  const content = `<p>${html(example.intro)}</p>\n${example.sections.map(([heading, text]) => `<h2>${html(heading)}</h2>\n<p>${html(text)}</p>`).join('\n')}\n<h2>${html(example.checklistTitle)}</h2>\n<ul>${example.checklist.map(text => `<li>${html(text)}</li>`).join('')}</ul>`;
  // Demonstrate real, editable marks, using the same raw DOM text offsets as
  // a user's selection. The original source markup remains untouched.
  const rawText = [example.intro, ...example.sections.flat(), example.checklistTitle, example.checklist.join('')].join('\n');
  const annotations = ['highlight', 'wavy'].map((style, index) => {
    const exact = example.sections[index][1];
    const start = rawText.indexOf(exact);
    return {type: 'text', style, start, end: start + exact.length, exact};
  });
  const textContent = [example.intro, ...example.sections.flat(), example.checklistTitle, ...example.checklist].join(' ');
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
  const wordCount = (textContent.match(cjk) || []).length + (textContent.replace(cjk, ' ').match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;
  return {
    id: crypto.randomUUID(), title: example.title, url: '', siteName: 'Pageleaf', author: 'Pageleaf',
    lang, excerpt: '', publishedTime: '', wordCount, minutes: Math.max(1, Math.ceil(wordCount / 350)),
    capturedAt: new Date().toISOString(), mode: 'demo', warnings: ['demoWarning'], textContent, content, annotations,
    markdown: `${example.intro}\n\n${example.sections.map(([heading, text]) => `## ${heading}\n\n${text}`).join('\n\n')}\n\n## ${example.checklistTitle}\n\n${example.checklist.map(text => `- ${text}`).join('\n')}\n`,
  };
}
