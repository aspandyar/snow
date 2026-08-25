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
      подзаголовок: 'Как полтысячи кирпичей ложатся на шар',
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
      заголовок: 'Цифры',
      подзаголовок: 'Чего это стоит',
      абзацы: [
        'Здесь будут честные замеры: сколько стоит каждый эффект в кадре, где проходит ' +
          'граница на слабой машине и что отключается первым.',
        'Пока их нет — и писать сюда правдоподобные числа вместо измеренных было бы ' +
          'ровно тем враньём, от которого страница защищена везде остальным.',
      ],
      подпись: 'Раздел ждёт замеров',
    },
  ] as Раздел[],

  подвал: {
    исходники: 'Исходники',
    языкПодпись: 'Язык',
  },
}

const АНГЛИЙСКИЙ: typeof РУССКИЙ = {
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
      подзаголовок: 'How five hundred bricks sit on a sphere',
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
      заголовок: 'Numbers',
      подзаголовок: 'What it costs',
      абзацы: [
        'Honest measurements go here: what each effect costs per frame, where the line ' +
          'falls on a weak machine, and what gets turned off first.',
        'They do not exist yet - and writing plausible numbers instead of measured ones ' +
          'would be exactly the kind of lying this page is built to avoid everywhere else.',
      ],
      подпись: 'This section is waiting for measurements',
    },
  ] as Раздел[],

  подвал: {
    исходники: 'Source',
    языкПодпись: 'Language',
  },
}

export const ТЕКСТЫ: Record<Язык, typeof РУССКИЙ> = {
  ru: РУССКИЙ,
  en: АНГЛИЙСКИЙ,
}
