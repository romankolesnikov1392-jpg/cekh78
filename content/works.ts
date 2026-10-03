import type { StaticImageData } from "next/image"

import type { ServiceSlug } from "@/content/services"
import { typoDeep } from "@/lib/typo"

/*
 * TODO: заменить на реальные фото клиента до/после.
 * Сейчас здесь честные стоковые placeholder-пары (Unsplash): «до» и «после» — снимки
 * РАЗНЫХ автомобилей, подобранные по цвету и ракурсу. В подписях и alt они описаны
 * нейтрально («повреждение двери» / «результат ремонта») и не выдаются за работы сервиса.
 * Для 1:1 соответствия снимайте реальную пару с одной точки и при одном свете.
 */
import doorBefore from "@/assets/photos/works/door-before.jpg"
import doorAfter from "@/assets/photos/works/door-after.jpg"
import crushBefore from "@/assets/photos/works/crush-before.jpg"
import crushAfter from "@/assets/photos/works/crush-after.jpg"
import fenderBefore from "@/assets/photos/works/fender-before.jpg"
import fenderAfter from "@/assets/photos/works/fender-after.jpg"
import frontBefore from "@/assets/photos/works/front-before.jpg"
import frontAfter from "@/assets/photos/works/front-after.jpg"
import rearBefore from "@/assets/photos/works/rear-before.jpg"
import rearAfter from "@/assets/photos/works/rear-after.jpg"
import whiteDoorBefore from "@/assets/photos/works/white-door-before.jpg"
import whiteDoorAfter from "@/assets/photos/works/white-door-after.jpg"
import headlightBefore from "@/assets/photos/works/headlight-before.jpg"
import headlightAfter from "@/assets/photos/works/headlight-after.jpg"
import rustBefore from "@/assets/photos/works/rust-before.jpg"
import rustAfter from "@/assets/photos/works/rust-after.jpg"
import brakesBefore from "@/assets/photos/works/brakes-before.jpg"
import brakesAfter from "@/assets/photos/works/brakes-after.jpg"
import shocksBefore from "@/assets/photos/works/shocks-before.jpg"
import shocksAfter from "@/assets/photos/works/shocks-after.jpg"
import oilBefore from "@/assets/photos/works/oil-before.jpg"
import oilAfter from "@/assets/photos/works/oil-after.jpg"
import timingBefore from "@/assets/photos/works/timing-before.jpg"
import timingAfter from "@/assets/photos/works/timing-after.jpg"
import dashBefore from "@/assets/photos/works/dashboard-before.jpg"
import dashAfter from "@/assets/photos/works/dashboard-after.jpg"

export type Work = {
  id: string
  service: ServiceSlug
  car: string
  problem: string
  work: string
  duration: string
  result: string
  before: { src: StaticImageData; alt: string }
  after: { src: StaticImageData; alt: string }
  featured?: boolean
}

const works: Work[] = [
  {
    id: "bmw-5-door",
    service: "kuzovnoy-remont",
    car: "BMW 5 Series (G30), 2019",
    problem: "Повреждение передней двери и крыла после парковки: вмятина с заломом металла.",
    work: "Рихтовка + локальная покраска + полировка",
    duration: "3 рабочих дня",
    result: "Граница ремонта визуально не определяется при обычном осмотре.",
    before: { src: doorBefore, alt: "Вмятина с заломом на тёмной двери автомобиля — пример повреждения" },
    after: { src: doorAfter, alt: "Ровная глянцевая дверь тёмного автомобиля — пример результата ремонта" },
    featured: true,
  },
  {
    id: "mercedes-a-front",
    service: "kuzovnoy-remont",
    car: "Mercedes-Benz A-Class (W177), 2020",
    problem: "Удар в передний угол: смяты капот и крыло, разбита фара, повреждён усилитель бампера.",
    work: "Стапель + замена фары и усилителя + покраска трёх элементов",
    duration: "9 рабочих дней с поставкой фары",
    result: "Зазоры капота и крыла — в заводском допуске, фара откалибрована.",
    before: { src: crushBefore, alt: "Смятый капот и разбитая фара после фронтального удара — пример повреждения" },
    after: { src: crushAfter, alt: "Целая фара и ровный капот серого автомобиля — пример результата ремонта" },
    featured: true,
  },
  {
    id: "octavia-fender",
    service: "kuzovnoy-remont",
    car: "Skoda Octavia (A7), 2017",
    problem: "Вмятина на заднем крыле с трещинами лакокрасочного покрытия.",
    work: "Вытяжка споттером + шпатлёвка тонким слоем + покраска с переходом на дверь",
    duration: "4 рабочих дня",
    result: "Геометрия арки сохранена, толщина покрытия — как у соседних деталей.",
    before: { src: fenderBefore, alt: "Вмятина и трещины краски на заднем крыле серого автомобиля — пример повреждения" },
    after: { src: fenderAfter, alt: "Ровное заднее крыло тёмно-серого автомобиля — пример результата ремонта" },
    featured: true,
  },
  {
    id: "golf-front",
    service: "kuzovnoy-remont",
    car: "Volkswagen Golf, 2021",
    problem: "Сорван передний бампер, повреждены крыло и подкрылок.",
    work: "Пайка креплений бампера + рихтовка крыла + покраска двух элементов",
    duration: "5 рабочих дней",
    result: "Бампер восстановили, а не заменили — клиент сэкономил 34 000 ₽ на детали.",
    before: { src: frontBefore, alt: "Сорванный передний бампер и повреждённое крыло белого автомобиля — пример повреждения" },
    after: { src: frontAfter, alt: "Передняя часть белого хэтчбека без повреждений — пример результата ремонта" },
  },
  {
    id: "mazda-3-rear",
    service: "kuzovnoy-remont",
    car: "Mazda 3 (BP), 2020",
    problem: "Удар сзади: бампер, фонарь и крышка багажника.",
    work: "Замена фонаря + ремонт крышки багажника + покраска бампера и крышки",
    duration: "6 рабочих дней",
    result: "Зазоры крышки выставлены, багажник закрывается без усилия.",
    before: { src: rearBefore, alt: "Смятая задняя часть тёмного автомобиля с разрушенной краской — пример повреждения" },
    after: { src: rearAfter, alt: "Задняя часть тёмно-серого седана с целыми фонарями — пример результата ремонта" },
  },
  {
    id: "picasso-door",
    service: "kuzovnoy-remont",
    car: "Citroën C4 Picasso, 2015",
    problem: "Следы чужого ремонта: разнотон и проступающий грунт на передней двери.",
    work: "Снятие старого покрытия + подготовка + покраска с подбором цвета",
    duration: "3 рабочих дня",
    result: "Дверь не отличается от соседних элементов при дневном свете.",
    before: { src: whiteDoorBefore, alt: "Пятна грунта и разнотон на белой двери после некачественного ремонта — пример повреждения" },
    after: { src: whiteDoorAfter, alt: "Ровно окрашенная белая дверь автомобиля — пример результата ремонта" },
  },
  {
    id: "mazda-6-headlights",
    service: "kuzovnoy-remont",
    car: "Mazda 6 (GJ), 2014",
    problem: "Фары помутнели и пожелтели, ближний свет стал заметно слабее.",
    work: "Абразивная полировка фар + защитное покрытие",
    duration: "1 день",
    result: "Прозрачность восстановлена, световое пятно снова чёткое.",
    before: { src: headlightBefore, alt: "Помутневшая пожелтевшая фара автомобиля — пример до полировки" },
    after: { src: headlightAfter, alt: "Прозрачная фара с линзой — пример результата полировки" },
  },
  {
    id: "solaris-rust",
    service: "kuzovnoy-remont",
    car: "Hyundai Solaris, 2014",
    problem: "Коррозия на задней арке, вздутие краски.",
    work: "Вскрытие очага до металла + вварка ремонтной вставки + антикор + покраска",
    duration: "5 рабочих дней",
    result: "Гарантия 12 месяцев на отсутствие коррозии в зоне ремонта.",
    before: { src: rustBefore, alt: "Ржавчина под отслоившейся синей краской — пример коррозии кузова" },
    after: { src: rustAfter, alt: "Глянцевая синяя панель кузова без следов коррозии — пример результата ремонта" },
  },
  {
    id: "sportage-brakes",
    service: "hodovaya",
    car: "Kia Sportage, 2019",
    problem: "Вибрация руля при торможении и скрип.",
    work: "Замена передних тормозных дисков и колодок + обслуживание направляющих суппорта",
    duration: "1,5 часа",
    result: "Вибрация ушла, торможение ровное.",
    before: { src: brakesBefore, alt: "Изношенный тормозной диск со ржавчиной и старый суппорт — деталь до замены" },
    after: { src: brakesAfter, alt: "Новый тормозной диск и суппорт на ступице — после замены" },
  },
  {
    id: "pajero-shocks",
    service: "hodovaya",
    car: "Mitsubishi Pajero Sport, 2017",
    problem: "Раскачка на волнах, течь заднего амортизатора.",
    work: "Замена задних амортизаторов и пружин + развал-схождение",
    duration: "4 часа",
    result: "Машина держит дорогу, раскачка и «клевки» при торможении ушли.",
    before: { src: shocksBefore, alt: "Старый амортизатор с пружиной в грязи и следах масла — деталь до замены" },
    after: { src: shocksAfter, alt: "Новый амортизатор с красной пружиной — после замены" },
  },
  {
    id: "rio-service",
    service: "to",
    car: "Kia Rio X, 2021, 60 000 км",
    problem: "Плановое ТО-4 по регламенту производителя.",
    work: "Масло и фильтр + воздушный и салонный фильтры + свечи + чек-лист из 40 пунктов",
    duration: "1,5 часа",
    result: "Фотоотчёт по чек-листу, следующее ТО — через 10 000 км.",
    before: { src: oilBefore, alt: "Снятие старого масляного фильтра, отработанное масло стекает — процесс ТО" },
    after: { src: oilAfter, alt: "Заливка нового моторного масла в двигатель — процесс ТО" },
  },
  {
    id: "tiguan-timing",
    service: "remont",
    car: "Volkswagen Tiguan 2.0 TSI, 2016",
    problem: "Дребезг при холодном пуске, ошибка по фазам газораспределения.",
    work: "Замена цепи ГРМ с натяжителем и успокоителями",
    duration: "2 рабочих дня",
    result: "Фазы в норме, двигатель работает тихо на холодную.",
    before: { src: timingBefore, alt: "Открытая головка блока цилиндров с распредвалами и цепью ГРМ — процесс ремонта" },
    after: { src: timingAfter, alt: "Собранный двигатель TSI в моторном отсеке — после ремонта" },
  },
  {
    id: "passat-charging",
    service: "avtoelektrika",
    car: "Volkswagen Passat B7, 2013",
    problem: "На панели горят EPC, Check Engine и индикатор заряда.",
    work: "Диагностика сканером и осциллографом + замена регулятора напряжения генератора",
    duration: "2 часа",
    result: "14,2 В в бортсети, генератор целиком менять не пришлось.",
    before: { src: dashBefore, alt: "Приборная панель с горящими индикаторами EPC, заряда и неисправности двигателя" },
    after: { src: dashAfter, alt: "Приборная панель без индикаторов неисправностей" },
  },
]

const typed = typoDeep(works)

export function getWorks() {
  return typed
}

export function getFeaturedWorks() {
  return typed.filter((w) => w.featured)
}

export function getWorksByService(slug: ServiceSlug) {
  return typed.filter((w) => w.service === slug)
}
