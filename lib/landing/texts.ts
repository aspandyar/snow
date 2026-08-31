import type { Язык } from './language'

/** Тексты страницы на двух языках.
 *
 *  Лежат данными, а не в разметке: иначе перевод пришлось бы искать по
 *  компонентам, и один из двух языков неизбежно отстал бы. Здесь оба
 *  варианта стоят рядом, и пропуск виден глазом.
 *
 *  Типы выведены из русского варианта: английский обязан иметь ровно те
 *  же ключи, иначе сборка не пройдёт. Это дешёвая замена процессу
 *  перевода — забыть строку нельзя. */
type Раздел = {
  номер: string
  заголовок: string
  подзаголовок: string
  абзацы: string[]
  подпись: string
}

const РУССКИЙ = {
  /** Подпись под полосой на экране ожидания. Не «Загрузка…», а строка о
   *  том, ЧТО грузится: несколько мегабайт карт объясняют сами себя, и
   *  ожидание перестаёт выглядеть зависанием. */
  загрузка: 'Собираем сцену: снег, небо, восемь сотен кирпичей',

  шапка: {
    название: 'snow',
    описание:
      'Ледяная сфера из кирпичей над заснеженной равниной. Прокрутка ведёт камеру, ' +
      'в конце сфера раскрывается и свет изнутри забирает кадр. Ниже — как это устроено.',
    сноска:
      'Все схемы на этой странице нарисованы теми же функциями, что считают сцену. ' +
      'Не картинками: измените число в настройках — изменятся и сцена, и схема.',
  },

  разделы: [
    {
      номер: '01',
      заголовок: 'Кладка',
      подзаголовок: 'Как восемь сотен кирпичей ложатся на шар',
      абзацы: [
        'Сфера режется на кольца по широте. В каждом кольце столько кирпичей, ' +
          'сколько нужно, чтобы их ширина везде была одинаковой: длина кольца равна ' +
          '2πR·sin θ, и при делении на количество синус сокращается. Без синуса кирпичи ' +
          'у полюсов сплющились бы в иглы.',
        'Широта берётся у СЕРЕДИНЫ кольца, а не у границы. На границе нулевого кольца ' +
          'нормаль совпадает с вертикалью, векторное произведение для касательной ' +
          'вырождается в ноль, и базис рассыпается — кирпичи встают как попало.',
        'Поворот кирпича задаётся полным базисом из трёх осей, а не поворотом одного ' +
          'вектора в другой. Поворот вектора в вектор оставляет крен свободным, и кладка ' +
          'выглядит пьяной: кирпичи лежат на сфере, но развёрнуты вразнобой.',
      ],
      подпись: 'Кирпичей в кольце — по числу колец от полюса к полюсу',
    },
    {
      номер: '02',
      заголовок: 'Равнина',
      подзаголовок: 'Одна плоскость и одна функция высоты',
      абзацы: [
        'Под сферой не набор объектов, а единственная плоскость, вершины которой ' +
          'подняты функцией высоты. Эта же функция — единственный источник правды о ' +
          'рельефе: по ней ищет опору луч курсора, по ней стелется туман.',
        'Дюны сделаны конечными колоколами, а не гауссианами. У гауссианы бесконечный ' +
          'хвост: дюна в семидесяти метрах незаметно приподняла бы землю под самой ' +
          'сферой, и тень легла бы не туда. Конечный колокол обрезан радиусом и за ним ' +
          'ровно ноль.',
        'Ловушка знака глубины: плоскость создаётся в XY и поворачивается на минус ' +
          'девяносто градусов вокруг X, поэтому местная координата y превращается в ' +
          'мировую z со знаком минус. Перевод вынесен отдельной функцией только затем, ' +
          'чтобы его можно было проверить тестом.',
      ],
      подпись: 'Профиль высоты вдоль линии через равнину, метры',
    },
    {
      номер: '03',
      заголовок: 'Следы',
      подзаголовок: 'Снег мнётся и затягивается сам',
      абзацы: [
        'След — это обычное полотно, на котором курсор рисует тёмное пятно. Полотно ' +
          'служит карте смещения: тёмное продавливает снег, белое оставляет ровным.',
        'Затухание сделано без единого таймера и без списка точек. Каждый кадр всё ' +
          'полотно заливается белым с малой прозрачностью — и старые следы гаснут сами, ' +
          'просто потому что их закрашивают. Список точек пришлось бы чистить, а заливка ' +
          'чистит себя.',
        'Одной карты смещения оказалось мало: она двигает вершины, но не пересчитывает ' +
          'нормали. На однородном белом снегу вмятина без тени неразличима. Лечится тем, ' +
          'что то же полотно назначается второй раз — картой затенения.',
      ],
      подпись: 'Сколько остаётся от следа через n кадров',
    },
    {
      номер: '04',
      заголовок: 'Проём',
      подзаголовок: 'Как в кладке открывается круглый вход',
      абзацы: [
        'Кирпичи вокруг точки входа отъезжают от неё по своим меридианам. Кирпич у самой ' +
          'оси уезжает на весь радиус проёма, кирпич на краю зоны не двигается вовсе, ' +
          'между ними — линейно.',
        'Линейно, а не сглаженно: у сглаженного перехода нулевая скорость в нуле, и ' +
          'кирпичи у оси расходились бы одинаково, оставаясь пробкой ровно посреди дыры.',
        'Отъезжая, кирпичи сгущаются по меридиану вдвое с лишним — и оказались бы внутри ' +
          'друг друга. Поэтому они ещё и всплывают: чем ближе кирпич был к оси, тем выше. ' +
          'Кладка ложится внахлёст, как чешуя, и вокруг проёма вырастает воронка.',
      ],
      подпись: 'Углы колец до раскрытия и после',
    },
    {
      номер: '05',
      заголовок: 'Прокрутка',
      подзаголовок: 'Чем меряется время сцены',
      абзацы: [
        'Единственное время в сцене — положение прокрутки. Всё, что происходит, обязано ' +
          'быть его функцией: иначе одно и то же положение давало бы разную картинку, и ' +
          'кадр перестал бы быть воспроизводимым.',
        'Страница наезжает на кадр раньше, чем кончается прокрутка, — так задумано, чтобы ' +
          'зритель не смотрел в застывший кадр. Но это значит, что сцена обязана доиграть ' +
          'ДО наезда. Однажды они разошлись, и весь влёт внутрь сферы играл за страницей.',
        'Теперь моменты не задаются числами, а считаются друг из друга: конец сцены ' +
          'зажат наездом страницы, начало света — точкой, где камера доходит до сферы, ' +
          'конец света — тем же наездом. Разойтись им больше негде.',
      ],
      подпись: 'Доли прокрутки: сцена, свет, приход страницы',
    },
    {
      номер: '06',
      заголовок: 'Горизонт',
      подзаголовок: 'Из чего сделана даль',
      абзацы: [
        'Горы — не сетка, а три замкнутых кольца: цилиндр без дна и крышки, у которого ' +
          'верхний край поднят профилем, а нижний утоплен под снег. Смотрим мы изнутри. ' +
          'Раньше на их месте стояли плоскости вдоль одной стороны — и работало это ровно ' +
          'пока камера смотрела оттуда же. Стоило ей облететь сферу, как в кадр попадал ' +
          'открытый край равнины.',
        'Профиль считается по УГЛУ, а не по длине дуги. Кольцо замкнуто: угол ноль и угол ' +
          'два пи — одна точка. Считай мы от дуги, в ней сошлись бы два разных значения ' +
          'высоты, и по всему кольцу прошла бы вертикальная ступенька.',
        'Гребень — верхняя огибающая колоколов, а не их сумма. Сумма кладёт на ' +
          'пересечении двух гор купол и сливает их в насыпь; максимум оставляет там ' +
          'излом — то самое ребро, которым гора отличается от холма. Поверх крупных ' +
          'вершин садятся отроги, и каждый поднимается над склоном под собой, поэтому на ' +
          'ровном горизонте бугорков не появляется.',
        'До огибающей пробовали шум — дважды. Обычный менял горе высоту, оставляя тот же ' +
          'гладкий колокол: узел шума приходился реже, чем ширина горы. Хребтовый, где ' +
          'излом рождается на нулях, дал двенадцать вершин на весь круг — меньше двух на ' +
          'гору, и разглядеть их было нечем. Оба раза это выяснилось счётом, а не глазом.',
        'Снег — полторы тысячи точек и ОДИН вызов отрисовки. Падение, повтор и качание ' +
          'живут в вершинном шейдере, наружу в кадр уходит одна переменная — время. Куб ' +
          'со снегом привязан к камере остатком от деления: снежинка, ушедшая ниже дна, ' +
          'тем же выражением оказывается под потолком, поэтому снег не кончается и при ' +
          'этом не едет за зрителем приклеенным.',
      ],
      подпись: 'Тонкой линией — крупные вершины, толстой — гребень с отрогами',
    },
    {
      номер: '07',
      заголовок: 'Цифры',
      подзаголовок: 'Чего это стоит',
      абзацы: [
        'Это единственные числа на странице, которые не считаются на месте. Всё ' +
          'остальное рисуется теми же функциями, что и сцена, и врать не может по ' +
          'построению. Производительность так не выведешь — её можно только измерить, и ' +
          'измерить на конкретной машине, в конкретном окне, конкретной сборкой. Поэтому ' +
          'рядом с числами стоят условия: без них «семь миллисекунд» не значит ничего.',
        'Мерится время всего кадра: обход всей кладки, отрисовка, цепочка ' +
          'постобработки. После каждого кадра из буфера читается один пиксель — это ' +
          'заставляет дождаться видеокарты. Без этого в отчёт попадало бы только время, ' +
          'за которое процессор успел отдать команды, а настоящая работа уезжала бы в ' +
          'следующий кадр.',
        'Показана медиана и хвост — девяносто пятый процентиль. Одной медианы мало: ' +
          'рывок раз в двадцать кадров зритель чувствует, а медиана его не показывает ' +
          'вовсе. Среднее не годится тем более — один кадр со сборкой мусора тянет его ' +
          'вверх на десятки процентов.',
        'Разброс между точками невелик, и это ожидаемо: вся кладка рисуется одним ' +
          'вызовом, сколько бы кирпичей в ней ни было, а цепочка постобработки работает ' +
          'по всему кадру независимо от того, что в нём происходит. Дороже всего выходит ' +
          'раскрытие — там к отрисовке добавляется пересчёт матриц у пары сотен кирпичей ' +
          'на каждый кадр.',
      ],
      подпись: 'Время кадра в миллисекундах: медиана и хвост',
    },
  ] as Раздел[],

  замеры: {
    точки: {
      общий: 'общий план',
      облёт: 'облёт',
      раскрытие: 'раскрытие',
      разгорание: 'разгорание',
    },
    условия: 'Снято',
    окно: (ш: number, в: number, п: number) =>
      `окно ${ш} × ${в} при плотности ${п}, то есть ${ш * п} × ${в * п} точек`,
    сборка: 'собранная версия, не сервер разработки',
    вызовы: 'вызовов отрисовки',
    треугольники: 'треугольников в кадре',
    текстуры: 'текстур',
    программы: 'шейдерных программ',
  },

  подвал: {
    исходники: 'Исходники',
    языкПодпись: 'Язык',
  },
}

const АНГЛИЙСКИЙ: typeof РУССКИЙ = {
  загрузка: 'Building the scene: snow, sky, eight hundred bricks',

  шапка: {
    название: 'snow',
    описание:
      'A sphere of ice bricks over a snowfield. Scrolling drives the camera; at the end ' +
      'the sphere opens and the light inside takes the frame. Below is how it works.',
    сноска:
      'Every diagram on this page is drawn by the same functions that compute the scene. ' +
      'Not by pictures: change a number in the settings and both the scene and the diagram change.',
  },

  разделы: [
    {
      номер: '01',
      заголовок: 'Masonry',
      подзаголовок: 'How eight hundred bricks sit on a sphere',
      абзацы: [
        'The sphere is cut into rings by latitude. Each ring holds as many bricks as it ' +
          'takes to keep their width the same everywhere: a ring is 2πR·sin θ long, and ' +
          'dividing by the count cancels the sine. Without it, bricks near the poles would ' +
          'be squeezed into needles.',
        'Latitude is taken at the MIDDLE of a ring, not at its edge. At the edge of ring ' +
          'zero the normal coincides with the vertical, the cross product for the tangent ' +
          'degenerates to zero, and the basis falls apart - bricks end up facing anywhere.',
        'A brick is oriented by a full three-axis basis, not by rotating one vector onto ' +
          'another. Vector-to-vector leaves roll unconstrained, and the masonry looks ' +
          'drunk: the bricks lie on the sphere but each is twisted its own way.',
      ],
      подпись: 'Bricks per ring, pole to pole',
    },
    {
      номер: '02',
      заголовок: 'The plain',
      подзаголовок: 'One plane and one height function',
      абзацы: [
        'Under the sphere there is no set of objects, only a single plane whose vertices ' +
          'are lifted by a height function. That function is also the single source of ' +
          'truth about the terrain: the cursor ray finds its footing by it, and the fog ' +
          'lies along it.',
        'Dunes are finite bells, not gaussians. A gaussian has an infinite tail: a dune ' +
          'seventy metres away would quietly lift the ground under the sphere itself, and ' +
          'the shadow would land in the wrong place. A finite bell is clipped at its ' +
          'radius and is exactly zero beyond it.',
        'A trap with the sign of depth: the plane is created in XY and rotated minus ' +
          'ninety degrees about X, so the local y becomes world z with a minus. The ' +
          'conversion is a separate function purely so a test can check it.',
      ],
      подпись: 'Height profile along a line across the plain, metres',
    },
    {
      номер: '03',
      заголовок: 'Footprints',
      подзаголовок: 'Snow dents and heals itself',
      абзацы: [
        'A footprint is an ordinary canvas on which the cursor paints a dark spot. The ' +
          'canvas feeds a displacement map: dark presses the snow down, white leaves it flat.',
        'The fading uses no timer and no list of points. Every frame the whole canvas is ' +
          'flooded with white at low opacity, and old marks fade simply because they are ' +
          'painted over. A list of points would have to be cleaned up; a flood cleans itself.',
        'The displacement map alone was not enough: it moves vertices but does not ' +
          'recompute normals. On uniform white snow a dent with no shading is invisible. ' +
          'The fix is to feed the same canvas a second time, as an occlusion map.',
      ],
      подпись: 'What is left of a mark after n frames',
    },
    {
      номер: '04',
      заголовок: 'The opening',
      подзаголовок: 'How a round doorway appears in the masonry',
      абзацы: [
        'Bricks around the entry point slide away from it along their own meridians. The ' +
          'brick on the axis moves by the full aperture radius, the brick at the edge of ' +
          'the zone does not move at all, and it is linear in between.',
        'Linear, not smoothstepped: a smoothstep has zero slope at zero, so the bricks on ' +
          'the axis would all move by the same amount and stay a plug in the middle of the ' +
          'hole.',
        'Sliding outward crowds the bricks along the meridian by more than half - they ' +
          'would end up inside each other. So they also rise: the closer a brick was to ' +
          'the axis, the higher it floats. The courses overlap like scales and a funnel ' +
          'grows around the opening.',
      ],
      подпись: 'Ring angles before the opening and after',
    },
    {
      номер: '05',
      заголовок: 'Scroll',
      подзаголовок: 'What measures the time of the scene',
      абзацы: [
        'The only time in the scene is the scroll position. Everything that happens has ' +
          'to be a function of it: otherwise the same position would give a different ' +
          'picture and the frame would stop being reproducible.',
        'The page slides over the canvas before the scroll ends - deliberately, so nobody ' +
          'stares at a frozen frame. But that means the scene has to finish BEFORE the ' +
          'page arrives. They drifted apart once, and the entire fly-in played behind the page.',
        'The moments are no longer numbers; they are computed from each other. The end of ' +
          'the scene is capped by the arrival of the page, the start of the light is the ' +
          'point where the camera reaches the sphere, and the end of the light is that ' +
          'same arrival. There is nowhere left for them to drift.',
      ],
      подпись: 'Fractions of the scroll: scene, light, arrival of the page',
    },
    {
      номер: '06',
      заголовок: 'The horizon',
      подзаголовок: 'What the distance is made of',
      абзацы: [
        'The mountains are not a mesh but three closed rings: an open cylinder with its ' +
          'top edge raised by a profile and its bottom sunk below the snow, seen from the ' +
          'inside. Before them stood planes along one side, and that worked exactly as ' +
          'long as the camera looked from that side. The moment it flew around the ' +
          'sphere, the open edge of the plain came into frame.',
        'The profile is a function of ANGLE, not arc length. A ring closes on itself: ' +
          'angle zero and angle two pi are the same point. From arc length two different ' +
          'heights would meet there, and a vertical step would run down the whole ring.',
        'The ridgeline is the upper envelope of the bells, not their sum. A sum puts a ' +
          'dome where two mountains overlap and merges them into one mound; a maximum ' +
          'leaves a crease there — the ridge that separates a mountain from a hill. Spurs ' +
          'then sit on the big peaks, each rising above the slope beneath it, so flat ' +
          'horizon stays flat.',
        'Noise was tried twice before the envelope. Plain noise only changed a ' +
          "mountain's height and left the same smooth bell: its nodes fell further apart " +
          'than a mountain is wide. Ridged noise, where the crease is born at zero ' +
          'crossings, gave twelve peaks around the entire ring — fewer than two per ' +
          'mountain, invisible at this distance. Both times counting found it, not the eye.',
        'The snow is fifteen hundred points and ONE draw call. Falling, wrapping and sway ' +
          'live in the vertex shader; one value crosses over per frame, time. The box of ' +
          'snow is pinned to the camera by a modulo: a flake that leaves through the floor ' +
          'reappears under the ceiling by the same expression, so the snow never runs out ' +
          'and never rides along with the viewer.',
      ],
      подпись: 'Thin line — the big peaks, thick — the ridgeline with spurs',
    },
    {
      номер: '07',
      заголовок: 'Numbers',
      подзаголовок: 'What it costs',
      абзацы: [
        'These are the only numbers on the page that are not computed on the spot. ' +
          'Everything else is drawn by the same functions that compute the scene and ' +
          'cannot lie by construction. Performance cannot be derived from code - it can ' +
          'only be measured, and measured on a particular machine, in a particular window, ' +
          'from a particular build. So the conditions sit next to the numbers: without ' +
          'them "seven milliseconds" means nothing.',
        'What is timed is the whole frame: walking the masonry, drawing, and the ' +
          'effect chain. After each frame one pixel is read back from the buffer, which ' +
          'forces a wait for the GPU. Without it the report would only cover the time the ' +
          'CPU took to submit commands, and the real work would slide into the next frame.',
        'The median is shown alongside the tail - the ninety-fifth percentile. The median ' +
          'alone is not enough: a hitch once every twenty frames is felt by the viewer and ' +
          'invisible to the median. An average is worse still - a single frame with a ' +
          'garbage collection drags it up by tens of percent.',
        'The spread between points is small, as expected: the whole masonry draws in one ' +
          'call however many bricks it holds, and the effect chain works over the whole ' +
          'frame regardless of what is in it. The opening costs the most - there the ' +
          'matrices of a couple of hundred bricks are recomputed every frame on top of ' +
          'the drawing.',
      ],
      подпись: 'Frame time in milliseconds: median and tail',
    },
  ] as Раздел[],

  замеры: {
    точки: {
      общий: 'establishing shot',
      облёт: 'orbit',
      раскрытие: 'opening',
      разгорание: 'glow',
    },
    условия: 'Measured',
    окно: (ш: number, в: number, п: number) =>
      `${ш} × ${в} window at density ${п}, that is ${ш * п} × ${в * п} device pixels`,
    сборка: 'production build, not the dev server',
    вызовы: 'draw calls',
    треугольники: 'triangles per frame',
    текстуры: 'textures',
    программы: 'shader programs',
  },

  подвал: {
    исходники: 'Source',
    языкПодпись: 'Language',
  },
}

export const ТЕКСТЫ: Record<Язык, typeof РУССКИЙ> = {
  ru: РУССКИЙ,
  en: АНГЛИЙСКИЙ,
}
