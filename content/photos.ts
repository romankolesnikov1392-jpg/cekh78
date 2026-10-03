import type { StaticImageData } from "next/image"

/*
 * Реестр фотографий.
 * Источник — Unsplash (бесплатная лицензия Unsplash, список ссылок: assets/photos/credits.json).
 * Все фото прошли единую цветокоррекцию (приглушённая насыщенность, мягкий контраст),
 * чтобы выглядеть как один фоторепортаж с производства.
 *
 * Это стоковые иллюстрации, а не съёмка конкретного сервиса. Подписи и alt
 * описывают то, что изображено, и не выдают снимки за работы «Цех78».
 */

import heroPorsche from "@/assets/photos/hero/porsche-lift.jpg"
import heroStripped from "@/assets/photos/hero/stripped-front.jpg"
import workshopOsb from "@/assets/photos/workshop/osb-bay.jpg"
import workshopMercedes from "@/assets/photos/workshop/mercedes-lift.jpg"
import workshopHall from "@/assets/photos/workshop/hall.jpg"
import kuzovHero from "@/assets/photos/services/kuzov-hero.jpg"
import toHero from "@/assets/photos/services/to-hero.jpg"
import hodovayaHero from "@/assets/photos/services/hodovaya-hero.jpg"
import elektrikaHero from "@/assets/photos/services/elektrika-hero.jpg"
import remontHero from "@/assets/photos/services/remont-hero.jpg"
import kuzovCard from "@/assets/photos/services/kuzov-card.jpg"
import toCard from "@/assets/photos/services/to-card.jpg"
import hodovayaCard from "@/assets/photos/services/hodovaya-card.jpg"
import elektrikaCard from "@/assets/photos/services/elektrika-card.jpg"
import remontCard from "@/assets/photos/services/remont-card.jpg"
import paintBooth from "@/assets/photos/equipment/paint-booth.jpg"
import lightTunnel from "@/assets/photos/equipment/light-tunnel.jpg"
import frameBench from "@/assets/photos/equipment/frame-bench.jpg"
import twoPostLift from "@/assets/photos/equipment/two-post-lift.jpg"
import alignmentLift from "@/assets/photos/equipment/alignment-lift.jpg"
import tireBay from "@/assets/photos/equipment/tire-bay.jpg"
import scanner from "@/assets/photos/equipment/scanner.jpg"
import multimeter from "@/assets/photos/equipment/multimeter.jpg"
import tireChanger from "@/assets/photos/equipment/tire-changer.jpg"
import liftUnderbody from "@/assets/photos/equipment/lift-underbody.jpg"
import engineStand from "@/assets/photos/equipment/engine-stand.jpg"
import toolWall from "@/assets/photos/equipment/tool-wall.jpg"
import polisher from "@/assets/photos/equipment/polisher.jpg"
import suspensionApart from "@/assets/photos/process/suspension-apart.jpg"
import sanding from "@/assets/photos/process/sanding.jpg"
import bumperOff from "@/assets/photos/process/bumper-off.jpg"
import brakeHub from "@/assets/photos/process/brake-hub.jpg"
import blogWinter from "@/assets/photos/blog/winter.jpg"
import blogOil from "@/assets/photos/blog/oil-service.jpg"
import blogPrep from "@/assets/photos/blog/prep-sanding.jpg"
import blogUsed from "@/assets/photos/blog/used-cars.jpg"

export type Photo = { src: StaticImageData; alt: string }

const p = (src: StaticImageData, alt: string): Photo => ({ src, alt })

export const photos = {
  heroPorsche: p(heroPorsche, "Серебристый Porsche 911 на двухстоечном подъёмнике в затемнённом цеху автосервиса"),
  heroStripped: p(heroStripped, "Спорткупе со снятым передним бампером и открытым капотом в кузовном цеху"),
  workshopOsb: p(workshopOsb, "Мастер у верстака в цеху: подъёмник, сварочный аппарат и снятые колёса"),
  workshopMercedes: p(workshopMercedes, "Мастер обслуживает седан с открытым капотом на посту с двухстоечным подъёмником"),
  workshopHall: p(workshopHall, "Просторный ремонтный цех с несколькими подъёмниками и автомобилями на постах"),

  kuzovHero: p(kuzovHero, "Седан BMW 3 серии со снятым передним бампером в кузовном цеху перед ремонтом"),
  toHero: p(toHero, "Мастер в перчатках заливает моторное масло в двигатель во время технического обслуживания"),
  hodovayaHero: p(hodovayaHero, "Автомобиль на подъёмнике со снятым колесом: виден тормозной диск и элементы подвески"),
  elektrikaHero: p(elektrikaHero, "Диагност подключил ноутбук со сканером к автомобилю и считывает ошибки электронных блоков"),
  remontHero: p(remontHero, "Руки механика с гаечным ключом в моторном отсеке автомобиля"),

  kuzovCard: p(kuzovCard, "Маляр в защитном костюме окрашивает кузов автомобиля в покрасочной камере"),
  toCard: p(toCard, "Механик снимает масляный фильтр, отработанное масло стекает в маслосборник"),
  hodovayaCard: p(hodovayaCard, "Мастер работает под автомобилем на подъёмнике рядом с амортизатором и пружиной подвески"),
  elektrikaCard: p(elektrikaCard, "Мастер проверяет блок предохранителей в моторном отсеке при поиске неисправности электрики"),
  remontCard: p(remontCard, "Моторист в рабочей одежде ремонтирует двигатель автомобиля в цеху"),

  paintBooth: p(paintBooth, "Маляр готовит автомобиль к окраске внутри покрасочно-сушильной камеры"),
  lightTunnel: p(lightTunnel, "Световой тоннель для контроля качества лакокрасочного покрытия, внутри автомобиль под защитным чехлом"),
  frameBench: p(frameBench, "Кузов автомобиля закреплён на стапеле с подъёмной платформой в светлом цеху"),
  twoPostLift: p(twoPostLift, "Двухстоечный подъёмник с автомобилем, у которого снята передняя часть для ремонта двигателя"),
  alignmentLift: p(alignmentLift, "Автомобиль на подъёмнике стенда развал-схождения с закреплёнными на колёсах мишенями"),
  tireBay: p(tireBay, "Шиномонтажный и балансировочный станки в зоне ходовой, рядом тележка с инструментом и ноутбук"),
  scanner: p(scanner, "Диагност с ноутбуком в салоне автомобиля: подключение сканера к диагностическому разъёму"),
  multimeter: p(multimeter, "Цифровой мультиметр на рабочем месте автоэлектрика"),
  tireChanger: p(tireChanger, "Мастер монтирует шину на диск на шиномонтажном станке"),
  liftUnderbody: p(liftUnderbody, "Кроссовер поднят на подъёмнике для осмотра днища и подвески"),
  engineStand: p(engineStand, "Моторист разбирает блок цилиндров двигателя на стенде"),
  toolWall: p(toolWall, "Инструментальная стена с ключами, съёмниками и измерительным инструментом"),
  polisher: p(polisher, "Полировальная машинка с поролоновым кругом на кузове белого автомобиля"),

  suspensionApart: p(suspensionApart, "Разобранная передняя подвеска автомобиля: стойка, рычаг и ступица в колёсной арке"),
  sanding: p(sanding, "Мастер шлифует зашпатлёванный участок заднего крыла перед покраской"),
  bumperOff: p(bumperOff, "Кроссовер со снятым передним бампером на подъёмнике в кузовном цеху"),
  brakeHub: p(brakeHub, "Тормозной диск и суппорт на ступице автомобиля со снятым колесом"),

  blogWinter: p(blogWinter, "Припаркованные вдоль улицы автомобили, засыпанные снегом после снегопада"),
  blogOil: p(blogOil, "Канистры моторного масла и новый масляный фильтр, подготовленные к замене"),
  blogPrep: p(blogPrep, "Подготовка заднего крыла к покраске: шлифовка шпатлёвки по краям ремонтной зоны"),
  blogUsed: p(blogUsed, "Ряд автомобилей с пробегом на площадке продажи"),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos
