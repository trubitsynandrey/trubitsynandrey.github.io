import { Coffee } from '../ui/icons/coffee'
import { FiitSticks } from '../ui/icons/fiit-sticks'
import { HeetSticks } from '../ui/icons/heet-sticks'
import { Icos } from '../ui/icons/icos'
import { Onerub } from '../ui/icons/onerub'
import { Powerbank } from '../ui/icons/powerbank'
import { Threerub } from '../ui/icons/threerub'
import { Toothbrush } from '../ui/icons/toothbrush'
import { Tworub } from '../ui/icons/tworub'

export const quizData = [
  {
    id: '1',
    question: 'Что дороже?',
    rightAnswer: {
      title: 'Пачка HEETS или Fiit стоит меньше, чем термокружка (в среднем)',
      whiteSubText:
        'Вкус нагреваемого табака отличается от вкуса сигарет, но при этом выделяется на 95% меньше вредных веществ*. Это стоящее отличие. Исследования** показали, что чувство удовлетворенности при использовании IQOS у тех, кто полностью на него перешел, сравнимо c удовлетворенностью тех, кто продолжал курить сигареты.',
      importantSubText:
        'ВАЖНО: это не означает снижение риска на 95%. Использование IQOS не исключает риски для здоровья.',
      unimportantSubText: [
        '*«На 95% меньше вредных веществ» означает среднее снижение уровней вредных веществ (без учета никотина) в аэрозоле IQOS в сравнении с дымом эталонной сигареты. Узнайте больше на iqos.com',
        '*Источник: 3-месячные клинические исследования, проведенные в США и Японии при участии 160 взрослых курильщиков, в каждом из них в реальных (амбулаторных) условиях.',
      ],
    },
    answers: [
      {
        id: 'a',
        icon: Coffee,
        text: 'Термокружка',
        isTrue: true,
      },
      {
        id: 'b',
        icon: HeetSticks,
        text: 'HEETS\nпачка стиков',
        wrongText: 'Пачка HEETS стоит 180 ₽ *',
        subWrongText:
          '*Цена в фирменных магазинах Q STORE и в ряде магазинов-партнеров Q PARTNER',
      },
      {
        id: 'c',
        icon: FiitSticks,
        text: 'Fiit\nпачка стиков',
        wrongText: 'Пачка Fiit стоит 160 ₽ *',
        subWrongText:
          '*Цена в фирменных магазинах Q STORE и в ряде магазинов-партнеров Q PARTNER',
      },
    ],
  },
  {
    id: '2',
    question: 'Что дешевле?',
    rightAnswer: {
      title:
        'Устройство IQOS стоит дешевле, чем пауэрбанк или электрическая зубная щетка',
      whiteSubText:
        'IQOS ПОЗВОЛЯЕТ НАСЛАДИТЬСЯ НАСТОЯЩИМ ВКУСОМ ТАБАКА. БЕЗ ГОРЕНИЯ. БЕЗ ДЫМА. БЕЗ ПЕПЛА.',
      unimportantSubText: [
        'Важно: не исключает риски, в аэрозоле содержится никотин, вызывающий зависимость.',
      ],
    },
    answers: [
      {
        id: 'a',
        text: 'Устройство IQOS',
        icon: Icos,
        isTrue: true,
      },
      {
        id: 'b',
        icon: Powerbank,
        text: 'Пауэрбанк',
        wrongText: 'Средняя цена на пауэрбанк — 2 200 ₽',
      },
      {
        id: 'c',
        icon: Toothbrush,
        text: 'Электрическая зубная щетка',
        wrongText: 'Средняя цена на электрическую зубную щётку — около 3 000 ₽',
      },
    ],
  },
  {
    id: '3',
    question: 'Сколько стоит устройство IQOS 3 duos?',
    rightAnswer: {
      title: 'Цена IQOS 3 DUOS - 1 990 ₽',
      whiteSubText:
        'При использовании IQOS выделяется на 95% меньше вредных веществ по сравнению с сигаретами.*',
      importantSubText:
        'Важно: это не означает снижение риска на 95%. Использование IQOS не исключает риски для здоровья.',
      unimportantSubText: [
        '* Снижение уровней вредных веществ (без учета никотина) в аэрозоле IQOS в сравнении с дымом эталонной сигареты.',
      ],
    },
    answers: [
      {
        id: 'a',
        text: '1 990 ₽',
        isTrue: true,
      },
      {
        id: 'b',
        text: '2 990 ₽',
        wrongText: 'Устройство IQOS 3 DUOS стоит 1 990 ₽',
      },
      {
        id: 'c',
        text: '3 990 ₽',
        wrongText: 'Устройство IQOS 3 DUOS стоит 1 990 ₽',
      },
    ],
  },
  {
    id: '4',
    question: 'сколько стоит взять IQOS 3 DUOS в аренду на неделю?',
    rightAnswer: {
      title:
        'У Вас есть возможность оценить преимущества IQOS 3 DUOS, воспользовавшись сервисом аренды устройства на 7 дней всего за 10 ₽',
    },
    answers: [
      {
        id: 'a',
        icon: Onerub,
        text: '10 ₽',
        isTrue: true,
      },
      {
        id: 'b',
        icon: Tworub,
        text: '100 ₽',
        wrongText: 'Аренда устройства IQOS 3 DUOS на 7 дней стоит 10 рублей',
      },
      {
        id: 'c',
        icon: Threerub,
        text: '150 ₽',
        wrongText: 'Аренда устройства IQOS 3 DUOS на 7 дней стоит 10 рублей',
      },
    ],
  },
]
