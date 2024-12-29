import db from "@/db";
import * as schema from "./schema";

await db.insert(schema.wordBook).values([
  {
    id: "-1",
    name: "请选择",
    description: "请选择",
    total: 0,
  },
  {
    id: "1",
    name: "普通高中西班牙语课程标准",
    description: "普通高中西班牙语课程标准",
    total: 100,
    tag: "高中",
    cover:
      "https://spanish-hhw.oss-cn-shanghai.aliyuncs.com/system/ModernSpanish.jpg",
  },
  {
    id: "3",
    name: "DELE A1",
    description: "DELE A1",
    total: 406,
    tag: "A1",
    cover:
      "https://spanish-hhw.oss-cn-shanghai.aliyuncs.com/system/DELE_A1.jpg",
  },
]);

await db.insert(schema.word).values([
  {
    id: "1",
    pos: "adj.",
    word: "gordo",
    definition: "definition",
    translation: "胖的",
    voiceUrl: "audio_files\\1_adj._gordo_es-es.mp3" 
  },
  {
    id: "2",
    pos: "adj.",
    word: "delgado",
    definition: "definition",
    translation: "瘦的",
    voiceUrl: "audio_files\\2_adj._delgado_es-es.mp3" 
  },
  {
    id: "3",
    pos: "adj.",
    word: "alto",
    definition: "definition",
    translation: "高的",
    voiceUrl: "audio_files\\3_adj._alto_es-es.mp3" 
  },
  {
    id: "4",
    pos: "m.",
    word: "pelo",
    definition: "definition",
    translation: "头发, 毛发",
    voiceUrl: "audio_files\\4_m._pelo_es-es.mp3" 
  },
  {
    id: "5",
    pos: "m.",
    word: "ojo",
    definition: "definition",
    translation: "眼睛",
    voiceUrl: "audio_files\\5_m._ojo_es-es.mp3" 
  },
  {
    id: "6",
    pos: "f.",
    word: "nariz",
    definition: "definition",
    translation: "鼻子",
    voiceUrl: "audio_files\\6_f._nariz_es-es.mp3" 
  },
  {
    id: "7",
    pos: "adj.",
    word: "bajo",
    definition: "definition",
    translation: "矮的，低的",
    voiceUrl: "audio_files\\7_adj._bajo_es-es.mp3" 
  },
  {
    id: "8",
    pos: "adj.,m.,f.",
    word: "guapo",
    definition: "definition",
    translation: "漂亮的, 帅哥，美女",
    voiceUrl: "audio_files\\8_adj.,f.,m._guapo_es-es.mp3" 
  },
  {
    id: "9",
    pos: "adj.",
    word: "feo",
    definition: "definition",
    translation: "丑的",
    voiceUrl: "audio_files\\9_adj._feo_es-es.mp3" 
  },
  {
    id: "10",
    pos: "n/a",
    word: "pelo rubio",
    definition: "definition",
    translation: "金头发",
    voiceUrl: "audio_files\\10_n_a_pelo rubio_es-es.mp3" 
  },
  {
    id: "11",
    pos: "n/a",
    word: "tener barba",
    definition: "definition",
    translation: "有胡须",
    voiceUrl: "audio_files\\11_None_tener barba_es-es.mp3" 
  },
  {
    id: "12",
    pos: "n/a",
    word: "tener bigote",
    definition: "definition",
    translation: "有髭（上唇至人中部位的胡子）",
    voiceUrl: "audio_files\\12_None_tener bigote_es-es.mp3" 
  },
  {
    id: "13",
    pos: "n/a",
    word: "llevar gafas",
    definition: "definition",
    translation: "戴眼镜",
    voiceUrl: "audio_files\\13_None_llevar gafas_es-es.mp3" 
  },
  {
    id: "14",
    pos: "n/a",
    word: "tener los ojos grandes",
    definition: "definition",
    translation: "有大眼睛",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "15",
    pos: "n/a",
    word: "tener los ojos pequeños",
    definition: "definition",
    translation: "有小眼睛",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "16",
    pos: "prnl.",
    word: "levantarse",
    definition: "definition",
    translation: "起床，起身",
    voiceUrl: "audio_files\\16_prnl._levantarse_es-es.mp3" 
  },
  {
    id: "17",
    pos: "adj.",
    word: "simpático",
    definition: "definition",
    translation: "和蔼可亲的",
    voiceUrl: "audio_files\\17_adj._simpático_es-es.mp3" 
  },
  {
    id: "18",
    pos: "adj.",
    word: "antipático",
    definition: "definition",
    translation: "令人厌恶的",
    voiceUrl: "audio_files\\18_adj._antipático_es-es.mp3" 
  },
  {
    id: "19",
    pos: "adj.",
    word: "inteligente",
    definition: "definition",
    translation: "聪明的",
    voiceUrl: "audio_files\\19_adj._inteligente_es-es.mp3" 
  },
  {
    id: "20",
    pos: "adj.",
    word: "trabajador",
    definition: "definition",
    translation: "勤劳的",
    voiceUrl: "audio_files\\20_adj._trabajador_es-es.mp3" 
  },
  {
    id: "21",
    pos: "adj.",
    word: "alegre",
    definition: "definition",
    translation: "高兴的，愉悦的，开朗的",
    voiceUrl: "audio_files\\21_adj._alegre_es-es.mp3" 
  },
  {
    id: "22",
    pos: "adj.",
    word: "serio",
    definition: "definition",
    translation: "严肃的",
    voiceUrl: "audio_files\\22_adj._serio_es-es.mp3" 
  },
  {
    id: "23",
    pos: "adj.",
    word: "tímido",
    definition: "definition",
    translation: "害羞的，胆怯的",
    voiceUrl: "audio_files\\23_adj._tímido_es-es.mp3" 
  },
  {
    id: "24",
    pos: "adj.",
    word: "sociable",
    definition: "definition",
    translation: "爱社交的",
    voiceUrl: "audio_files\\24_adj._sociable_es-es.mp3" 
  },
  {
    id: "25",
    pos: "m.",
    word: "nombre",
    definition: "definition",
    translation: "名字",
    voiceUrl: "audio_files\\25_m._nombre_es-es.mp3" 
  },
  {
    id: "26",
    pos: "n/a",
    word: "primer apellido",
    definition: "definition",
    translation: "第一姓氏",
    voiceUrl: "audio_files\\26_None_primer apellido_es-es.mp3" 
  },
  {
    id: "27",
    pos: "n/a",
    word: "segundo apellido",
    definition: "definition",
    translation: "第二姓氏",
    voiceUrl: "audio_files\\27_None_segundo apellido_es-es.mp3" 
  },
  {
    id: "28",
    pos: "m.",
    word: "señor",
    definition: "definition",
    translation: "先生",
    voiceUrl: "audio_files\\28_m._señor_es-es.mp3" 
  },
  {
    id: "29",
    pos: "f.",
    word: "señora",
    definition: "definition",
    translation: "女士",
    voiceUrl: "audio_files\\29_f._señora_es-es.mp3" 
  },
  {
    id: "30",
    pos: "tr.",
    word: "firmar",
    definition: "definition",
    translation: "签字",
    voiceUrl: "audio_files\\30_tr._firmar_es-es.mp3" 
  },
  {
    id: "31",
    pos: "prnl.",
    word: "llamarse",
    definition: "definition",
    translation: "叫…名字",
    voiceUrl: "audio_files\\31_prnl._llamarse_es-es.mp3" 
  },
  {
    id: "32",
    pos: "f.",
    word: "dirección",
    definition: "definition",
    translation: "地址",
    voiceUrl: "audio_files\\32_f._dirección_es-es.mp3" 
  },
  {
    id: "33",
    pos: "n/a",
    word: "correo electrónico",
    definition: "definition",
    translation: "电子邮件",
    voiceUrl: "audio_files\\33_None_correo electrónico_es-es.mp3" 
  },
  {
    id: "34",
    pos: "f.",
    word: "calle",
    definition: "definition",
    translation: "街",
    voiceUrl: "audio_files\\34_f._calle_es-es.mp3" 
  },
  {
    id: "35",
    pos: "f.",
    word: "avenida",
    definition: "definition",
    translation: "大道",
    voiceUrl: "audio_files\\35_f._avenida_es-es.mp3" 
  },
  {
    id: "36",
    pos: "m.",
    word: "paseo",
    definition: "definition",
    translation: "步行道，散步",
    voiceUrl: "audio_files\\36_m._paseo_es-es.mp3" 
  },
  {
    id: "37",
    pos: "m.",
    word: "número",
    definition: "definition",
    translation: "数字，号码",
    voiceUrl: "audio_files\\37_m._número_es-es.mp3" 
  },
  {
    id: "38",
    pos: "n/a",
    word: "código postal",
    definition: "definition",
    translation: "邮政编码",
    voiceUrl: "audio_files\\38_None_código postal_es-es.mp3" 
  },
  {
    id: "39",
    pos: "m.",
    word: "país",
    definition: "definition",
    translation: "国家",
    voiceUrl: "audio_files\\39_m._país_es-es.mp3" 
  },
  {
    id: "40",
    pos: "f.",
    word: "ciudad",
    definition: "definition",
    translation: "城市",
    voiceUrl: "audio_files\\40_f._ciudad_es-es.mp3" 
  },
  {
    id: "41",
    pos: "m.",
    word: "pueblo",
    definition: "definition",
    translation: "村子",
    voiceUrl: "audio_files\\41_m._pueblo_es-es.mp3" 
  },
  {
    id: "42",
    pos: "intr.",
    word: "vivir",
    definition: "definition",
    translation: "生活 生存",
    voiceUrl: "audio_files\\42_intr._vivir_es-es.mp3" 
  },
  {
    id: "43",
    pos: "n/a",
    word: "número de teléfono",
    definition: "definition",
    translation: "电话号码",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "44",
    pos: "m.",
    word: "móvil",
    definition: "definition",
    translation: "手机",
    voiceUrl: "audio_files\\44_m._móvil_es-es.mp3" 
  },
  {
    id: "45",
    pos: "n/a",
    word: "lugar de nacimiento",
    definition: "definition",
    translation: "出生地",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "46",
    pos: "n/a",
    word: "fecha de nacimiento",
    definition: "definition",
    translation: "出生日期",
    voiceUrl: "audio_files\\46_None_fecha de nacimiento_es-es.mp3" 
  },
  {
    id: "47",
    pos: "f.",
    word: "nacionalidad",
    definition: "definition",
    translation: "国籍",
    voiceUrl: "audio_files\\47_f._nacionalidad_es-es.mp3" 
  },
  {
    id: "48",
    pos: "adj.,m.,f.,m.",
    word: "extranjero",
    definition: "definition",
    translation: "外国的, 外国人 外国",
    voiceUrl: "audio_files\\48_adj.,f.,m._extranjero_es-es.mp3" 
  },
  {
    id: "49",
    pos: "adj.,m.,f.,m.",
    word: "español",
    definition: "definition",
    translation: "西班牙的,  西班牙人  西班牙语",
    voiceUrl: "audio_files\\49_adj.,f.,m._español_es-es.mp3" 
  },
  {
    id: "50",
    pos: "adj.,m.,f.,m.",
    word: "alemán",
    definition: "definition",
    translation: "德国的,  德国人  德语",
    voiceUrl: "audio_files\\50_adj.,f.,m._alemán_es-es.mp3" 
  },
  {
    id: "51",
    pos: "adj.,m.,f.",
    word: "mexicano",
    definition: "definition",
    translation: "墨西哥的,  墨西哥人",
    voiceUrl: "audio_files\\51_adj.,f.,m._mexicano_es-es.mp3" 
  },
  {
    id: "52",
    pos: "adj.,m.,f.,m.",
    word: "japonés",
    definition: "definition",
    translation: "日本的,  日本人  日语",
    voiceUrl: "audio_files\\52_adj.,f.,m._japonés_es-es.mp3" 
  },
  {
    id: "53",
    pos: "n/a",
    word: "ser de Laos",
    definition: "definition",
    translation: "是老挝人",
    voiceUrl: "audio_files\\53_None_ser de Laos_es-es.mp3" 
  },
  {
    id: "54",
    pos: "f.",
    word: "edad",
    definition: "definition",
    translation: "年龄",
    voiceUrl: "audio_files\\54_f._edad_es-es.mp3" 
  },
  {
    id: "55",
    pos: "m.,f.",
    word: "niño",
    definition: "definition",
    translation: "儿童，孩子",
    voiceUrl: "audio_files\\55_f.,m._niño_es-es.mp3" 
  },
  {
    id: "56",
    pos: "m.,f.,adj.",
    word: "chico",
    definition: "definition",
    translation: "小孩   小的，年幼的",
    voiceUrl: "audio_files\\56_adj.,f.,m._chico_es-es.mp3" 
  },
  {
    id: "57",
    pos: "adj.,m.,f.",
    word: "joven",
    definition: "definition",
    translation: "年轻的, 年轻人",
    voiceUrl: "audio_files\\57_adj.,f.,m._joven_es-es.mp3" 
  },
  {
    id: "58",
    pos: "adj.,m.,f.",
    word: "viejo",
    definition: "definition",
    translation: "老的，旧的, 老人",
    voiceUrl: "audio_files\\58_adj.,f.,m._viejo_es-es.mp3" 
  },
  {
    id: "59",
    pos: "n/a",
    word: "tener 18 años",
    definition: "definition",
    translation: "18岁",
    voiceUrl: "audio_files\\59_None_tener 18 años_es-es.mp3" 
  },
  {
    id: "60",
    pos: "m.",
    word: "hombre",
    definition: "definition",
    translation: "男人",
    voiceUrl: "audio_files\\60_m._hombre_es-es.mp3" 
  },
  {
    id: "61",
    pos: "f.",
    word: "mujer",
    definition: "definition",
    translation: "女人",
    voiceUrl: "audio_files\\61_f._mujer_es-es.mp3" 
  },
  {
    id: "62",
    pos: "n/a",
    word: "estado civil",
    definition: "definition",
    translation: "婚姻状况",
    voiceUrl: "audio_files\\62_None_estado civil_es-es.mp3" 
  },
  {
    id: "63",
    pos: "adj.",
    word: "soltero",
    definition: "definition",
    translation: "单身的",
    voiceUrl: "audio_files\\63_adj._soltero_es-es.mp3" 
  },
  {
    id: "64",
    pos: "adj.",
    word: "casado",
    definition: "definition",
    translation: "已婚的",
    voiceUrl: "audio_files\\64_adj._casado_es-es.mp3" 
  },
  {
    id: "65",
    pos: "adj.",
    word: "viudo",
    definition: "definition",
    translation: "丧偶的",
    voiceUrl: "audio_files\\65_adj._viudo_es-es.mp3" 
  },
  {
    id: "66",
    pos: "adj.",
    word: "separado",
    definition: "definition",
    translation: "分开的",
    voiceUrl: "audio_files\\66_adj._separado_es-es.mp3" 
  },
  {
    id: "67",
    pos: "adj.",
    word: "divorciado",
    definition: "definition",
    translation: "离婚的",
    voiceUrl: "audio_files\\67_adj._divorciado_es-es.mp3" 
  },
  {
    id: "68",
    pos: "f.",
    word: "llave",
    definition: "definition",
    translation: "钥匙",
    voiceUrl: "audio_files\\68_f._llave_es-es.mp3" 
  },
  {
    id: "69",
    pos: "f.",
    word: "cartera",
    definition: "definition",
    translation: "钱包",
    voiceUrl: "audio_files\\69_f._cartera_es-es.mp3" 
  },
  {
    id: "70",
    pos: "m.",
    word: "reloj",
    definition: "definition",
    translation: "手表，时钟",
    voiceUrl: "audio_files\\70_m._reloj_es-es.mp3" 
  },
  {
    id: "71",
    pos: "f.",
    word: "gafas",
    definition: "definition",
    translation: "[pl.] 眼镜",
    voiceUrl: "audio_files\\71_f._gafas_es-es.mp3" 
  },
  {
    id: "72",
    pos: "f.",
    word: "familia",
    definition: "definition",
    translation: "家庭，家人",
    voiceUrl: "audio_files\\72_f._familia_es-es.mp3" 
  },
  {
    id: "73",
    pos: "m.",
    word: "padres",
    definition: "definition",
    translation: "[pl.] 父母",
    voiceUrl: "audio_files\\73_m._padres_es-es.mp3" 
  },
  {
    id: "74",
    pos: "m.",
    word: "padre",
    definition: "definition",
    translation: "父亲",
    voiceUrl: "audio_files\\74_m._padre_es-es.mp3" 
  },
  {
    id: "75",
    pos: "f.",
    word: "madre",
    definition: "definition",
    translation: "母亲",
    voiceUrl: "audio_files\\75_f._madre_es-es.mp3" 
  },
  {
    id: "76",
    pos: "m.f",
    word: "hijo",
    definition: "definition",
    translation: "子，女",
    voiceUrl: "audio_files\\76_m._hijo_es-es.mp3" 
  },
  {
    id: "77",
    pos: "m.f",
    word: "hermano",
    definition: "definition",
    translation: "兄弟，姐妹",
    voiceUrl: "audio_files\\77_m._hermano_es-es.mp3" 
  },
  {
    id: "78",
    pos: "m.f",
    word: "tío",
    definition: "definition",
    translation: "伯父, 叔父, 姑父, 舅父，姨父伯母， 婶母， 姑母， 舅母， 姨母",
    voiceUrl: "audio_files\\78_m._tío_es-es.mp3" 
  },
  {
    id: "79",
    pos: "m.f",
    word: "sobrino",
    definition: "definition",
    translation: "侄子，外甥，侄女, 外甥女",
    voiceUrl: "audio_files\\79_m._sobrino_es-es.mp3" 
  },
  {
    id: "80",
    pos: "m.,f.",
    word: "abuelo",
    definition: "definition",
    translation: "爷爷，奶奶，姥爷，姥爷",
    voiceUrl: "audio_files\\80_f.,m._abuelo_es-es.mp3" 
  },
  {
    id: "81",
    pos: "m.,f.",
    word: "nieto",
    definition: "definition",
    translation: "孙子，孙女，外孙，外孙女",
    voiceUrl: "audio_files\\81_f.,m._nieto_es-es.mp3" 
  },
  {
    id: "82",
    pos: "m.,f.",
    word: "primo",
    definition: "definition",
    translation: "表兄弟，表姐妹",
    voiceUrl: "audio_files\\82_f.,m._primo_es-es.mp3" 
  },
  {
    id: "83",
    pos: "f.",
    word: "pareja",
    definition: "definition",
    translation: "伴侣",
    voiceUrl: "audio_files\\83_f._pareja_es-es.mp3" 
  },
  {
    id: "84",
    pos: "m.,f.",
    word: "novio",
    definition: "definition",
    translation: "男朋友，女朋友",
    voiceUrl: "audio_files\\84_f.,m._novio_es-es.mp3" 
  },
  {
    id: "85",
    pos: "m.,f.",
    word: "amigo",
    definition: "definition",
    translation: "朋友",
    voiceUrl: "audio_files\\85_f.,m._amigo_es-es.mp3" 
  },
  {
    id: "86",
    pos: "m.,f.",
    word: "jefe",
    definition: "definition",
    translation: "老板，首领",
    voiceUrl: "audio_files\\86_f.,m._jefe_es-es.mp3" 
  },
  {
    id: "87",
    pos: "f.",
    word: "fiesta",
    definition: "definition",
    translation: "聚会",
    voiceUrl: "audio_files\\87_f._fiesta_es-es.mp3" 
  },
  {
    id: "88",
    pos: "m.",
    word: "desayuno",
    definition: "definition",
    translation: "早饭",
    voiceUrl: "audio_files\\88_m._desayuno_es-es.mp3" 
  },
  {
    id: "89",
    pos: "f.",
    word: "comida",
    definition: "definition",
    translation: "午饭，食物",
    voiceUrl: "audio_files\\89_f._comida_es-es.mp3" 
  },
  {
    id: "90",
    pos: "f.",
    word: "merienda",
    definition: "definition",
    translation: "午后小吃",
    voiceUrl: "audio_files\\90_f._merienda_es-es.mp3" 
  },
  {
    id: "91",
    pos: "f.",
    word: "cena",
    definition: "definition",
    translation: "晚饭",
    voiceUrl: "audio_files\\91_f._cena_es-es.mp3" 
  },
  {
    id: "92",
    pos: "intr.,tr.",
    word: "desayunar",
    definition: "definition",
    translation: "吃早饭吃…作为早饭",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "93",
    pos: "tr.,intr.",
    word: "comer",
    definition: "definition",
    translation: "- 吃饭，吃午饭",
    voiceUrl: "audio_files\\93_intr.,tr._comer_es-es.mp3" 
  },
  {
    id: "94",
    pos: "intr.,tr.",
    word: "merendar",
    definition: "definition",
    translation: "吃午后点心吃…作为午后点心",
    voiceUrl: "audio_files\\94_intr. _merendar_es-es.mp3" 
  },
  {
    id: "95",
    pos: "tr.,intr.",
    word: "cenar",
    definition: "definition",
    translation: "- 吃晚饭",
    voiceUrl: "audio_files\\95_intr.,tr._cenar_es-es.mp3" 
  },
  {
    id: "96",
    pos: "f.",
    word: "agua",
    definition: "definition",
    translation: "水",
    voiceUrl: "audio_files\\96_f._agua_es-es.mp3" 
  },
  {
    id: "97",
    pos: "n/a",
    word: "agua mineral",
    definition: "definition",
    translation: "矿泉水",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "98",
    pos: "f.",
    word: "leche",
    definition: "definition",
    translation: "牛奶",
    voiceUrl: "audio_files\\98_f._leche_es-es.mp3" 
  },
  {
    id: "99",
    pos: "m.",
    word: "té",
    definition: "definition",
    translation: "茶",
    voiceUrl: "audio_files\\99_m._té_es-es.mp3" 
  },
  {
    id: "100",
    pos: "m.",
    word: "café",
    definition: "definition",
    translation: "咖啡",
    voiceUrl: "audio_files\\100_m._café_es-es.mp3" 
  },
  {
    id: "101",
    pos: "n/a",
    word: "café solo",
    definition: "definition",
    translation: "纯咖啡",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "102",
    pos: "n/a",
    word: "café con leche",
    definition: "definition",
    translation: "牛奶咖啡",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "103",
    pos: "n/a",
    word: "café cortado",
    definition: "definition",
    translation: "牛奶咖啡（多咖少奶）",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "104",
    pos: "f.",
    word: "cerveza",
    definition: "definition",
    translation: "啤酒",
    voiceUrl: "audio_files\\104_f._cerveza_es-es.mp3" 
  },
  {
    id: "105",
    pos: "n/a",
    word: "vino blanco",
    definition: "definition",
    translation: "白葡萄酒",
    voiceUrl: "audio_files\\105_None_vino blanco_es-es.mp3" 
  },
  {
    id: "106",
    pos: "n/a",
    word: "vino tinto",
    definition: "definition",
    translation: "红葡萄酒",
    voiceUrl: "audio_files\\106_None_vino tinto_es-es.mp3" 
  },
  {
    id: "107",
    pos: "intr.,tr.",
    word: "beber",
    definition: "definition",
    translation: "- 喝",
    voiceUrl: "audio_files\\107_intr.,tr._beber_es-es.mp3" 
  },
  {
    id: "108",
    pos: "f.",
    word: "carne",
    definition: "definition",
    translation: "肉",
    voiceUrl: "audio_files\\108_f._carne_es-es.mp3" 
  },
  {
    id: "109",
    pos: "m.",
    word: "pescado",
    definition: "definition",
    translation: "鱼",
    voiceUrl: "audio_files\\109_m._pescado_es-es.mp3" 
  },
  {
    id: "110",
    pos: "f.",
    word: "fruta",
    definition: "definition",
    translation: "水果",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "111",
    pos: "f.",
    word: "verdura",
    definition: "definition",
    translation: "蔬菜",
    voiceUrl: "audio_files\\111_f._verdura_es-es.mp3" 
  },
  {
    id: "112",
    pos: "m.",
    word: "huevo",
    definition: "definition",
    translation: "鸡蛋",
    voiceUrl: "audio_files\\112_m._huevo_es-es.mp3" 
  },
  {
    id: "113",
    pos: "m.",
    word: "pan",
    definition: "definition",
    translation: "面包",
    voiceUrl: "audio_files\\113_m._pan_es-es.mp3" 
  },
  {
    id: "114",
    pos: "m.",
    word: "bocadillo",
    definition: "definition",
    translation: "西班牙三明治",
    voiceUrl: "audio_files\\114_m._bocadillo_es-es.mp3" 
  },
  {
    id: "115",
    pos: "m.",
    word: "sándwich",
    definition: "definition",
    translation: "三明治",
    voiceUrl: "audio_files\\115_m._sándwich_es-es.mp3" 
  },
  {
    id: "116",
    pos: "f.",
    word: "hamburguesa",
    definition: "definition",
    translation: "汉堡包",
    voiceUrl: "audio_files\\116_f._hamburguesa_es-es.mp3" 
  },
  {
    id: "117",
    pos: "n/a",
    word: "primer plato",
    definition: "definition",
    translation: "第一道菜",
    voiceUrl: "audio_files\\117_None_primer plato_es-es.mp3" 
  },
  {
    id: "118",
    pos: "n/a",
    word: "segundo plato",
    definition: "definition",
    translation: "第二道菜",
    voiceUrl: "audio_files\\118_None_segundo plato_es-es.mp3" 
  },
  {
    id: "119",
    pos: "m.",
    word: "plato",
    definition: "definition",
    translation: "菜，盘子",
    voiceUrl: "audio_files\\119_m._plato_es-es.mp3" 
  },
  {
    id: "120",
    pos: "m.",
    word: "postre",
    definition: "definition",
    translation: "甜品",
    voiceUrl: "audio_files\\120_m._postre_es-es.mp3" 
  },
  {
    id: "121",
    pos: "f.",
    word: "sopa",
    definition: "definition",
    translation: "汤",
    voiceUrl: "audio_files\\121_f._sopa_es-es.mp3" 
  },
  {
    id: "122",
    pos: "f.",
    word: "ensalada",
    definition: "definition",
    translation: "沙拉",
    voiceUrl: "audio_files\\122_f._ensalada_es-es.mp3" 
  },
  {
    id: "123",
    pos: "f.",
    word: "paella",
    definition: "definition",
    translation: "海鲜饭",
    voiceUrl: "audio_files\\123_f._paella_es-es.mp3" 
  },
  {
    id: "124",
    pos: "f.",
    word: "tortilla",
    definition: "definition",
    translation: "鸡蛋饼，玉米饼[拉美]",
    voiceUrl: "audio_files\\124_f._tortilla_es-es.mp3" 
  },
  {
    id: "125",
    pos: "m.",
    word: "bar",
    definition: "definition",
    translation: "酒吧",
    voiceUrl: "audio_files\\125_m._bar_es-es.mp3" 
  },
  {
    id: "126",
    pos: "m.",
    word: "restaurante",
    definition: "definition",
    translation: "餐厅",
    voiceUrl: "audio_files\\126_m._restaurante_es-es.mp3" 
  },
  {
    id: "127",
    pos: "m.,f.",
    word: "camarero",
    definition: "definition",
    translation: "服务员  [拉美] mesero",
    voiceUrl: "audio_files\\127_f.,m._camarero_es-es.mp3" 
  },
  {
    id: "128",
    pos: "f.",
    word: "mesa",
    definition: "definition",
    translation: "桌子",
    voiceUrl: "audio_files\\128_f._mesa_es-es.mp3" 
  },
  {
    id: "129",
    pos: "m.",
    word: "menú",
    definition: "definition",
    translation: "菜单",
    voiceUrl: "audio_files\\129_m._menú_es-es.mp3" 
  },
  {
    id: "130",
    pos: "f.",
    word: "cuenta",
    definition: "definition",
    translation: "账单",
    voiceUrl: "audio_files\\130_f._cuenta_es-es.mp3" 
  },
  {
    id: "131",
    pos: "m.",
    word: "instituto",
    definition: "definition",
    translation: "学院，协会",
    voiceUrl: "audio_files\\131_m._instituto_es-es.mp3" 
  },
  {
    id: "132",
    pos: "f.",
    word: "universidad",
    definition: "definition",
    translation: "大学",
    voiceUrl: "audio_files\\132_f._universidad_es-es.mp3" 
  },
  {
    id: "133",
    pos: "f.",
    word: "clase",
    definition: "definition",
    translation: "课程",
    voiceUrl: "audio_files\\133_f._clase_es-es.mp3" 
  },
  {
    id: "134",
    pos: "f.",
    word: "biblioteca",
    definition: "definition",
    translation: "图书馆",
    voiceUrl: "audio_files\\134_f._biblioteca_es-es.mp3" 
  },
  {
    id: "135",
    pos: "m.,f.",
    word: "profesor",
    definition: "definition",
    translation: "教师，教授",
    voiceUrl: "audio_files\\135_f.,m._profesor_es-es.mp3" 
  },
  {
    id: "136",
    pos: "m.,f.",
    word: "estudiante",
    definition: "definition",
    translation: "学生",
    voiceUrl: "audio_files\\136_f.,m._estudiante_es-es.mp3" 
  },
  {
    id: "137",
    pos: "m.,f.",
    word: "director",
    definition: "definition",
    translation: "领导者，负责人",
    voiceUrl: "audio_files\\137_f.,m._director_es-es.mp3" 
  },
  {
    id: "138",
    pos: "m.,f.",
    word: "compañero",
    definition: "definition",
    translation: "同伴，同学",
    voiceUrl: "audio_files\\138_f.,m._compañero_es-es.mp3" 
  },
  {
    id: "139",
    pos: "n/a",
    word: "clase de español",
    definition: "definition",
    translation: "西班牙语课",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "140",
    pos: "m.",
    word: "examen",
    definition: "definition",
    translation: "考试",
    voiceUrl: "audio_files\\140_m._examen_es-es.mp3" 
  },
  {
    id: "141",
    pos: "tr.",
    word: "aprender",
    definition: "definition",
    translation: "学习，掌握",
    voiceUrl: "audio_files\\141_tr._aprender_es-es.mp3" 
  },
  {
    id: "142",
    pos: "tr.",
    word: "estudiar",
    definition: "definition",
    translation: "学",
    voiceUrl: "audio_files\\142_tr._estudiar_es-es.mp3" 
  },
  {
    id: "143",
    pos: "n/a",
    word: "ir a clase",
    definition: "definition",
    translation: "去上课",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "144",
    pos: "n/a",
    word: "hacer un examen",
    definition: "definition",
    translation: "参加一个考试",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "145",
    pos: "m.",
    word: "ejercicio",
    definition: "definition",
    translation: "练习",
    voiceUrl: "audio_files\\145_m._ejercicio_es-es.mp3" 
  },
  {
    id: "146",
    pos: "f.",
    word: "actividad",
    definition: "definition",
    translation: "活动",
    voiceUrl: "audio_files\\146_f._actividad_es-es.mp3" 
  },
  {
    id: "147",
    pos: "f.",
    word: "lección",
    definition: "definition",
    translation: "课",
    voiceUrl: "audio_files\\147_f._lección_es-es.mp3" 
  },
  {
    id: "148",
    pos: "f.",
    word: "unidad",
    definition: "definition",
    translation: "单元",
    voiceUrl: "audio_files\\148_f._unidad_es-es.mp3" 
  },
  {
    id: "149",
    pos: "f.",
    word: "página",
    definition: "definition",
    translation: "页",
    voiceUrl: "audio_files\\149_f._página_es-es.mp3" 
  },
  {
    id: "150",
    pos: "f.",
    word: "pregunta",
    definition: "definition",
    translation: "问题",
    voiceUrl: "audio_files\\150_f._pregunta_es-es.mp3" 
  },
  {
    id: "151",
    pos: "n/a",
    word: "en parejas",
    definition: "definition",
    translation: "按两人一组，成对的",
    voiceUrl: "audio_files\\151_None_en parejas_es-es.mp3" 
  },
  {
    id: "152",
    pos: "n/a",
    word: "en grupos",
    definition: "definition",
    translation: "按组",
    voiceUrl: "audio_files\\152_None_en grupos_es-es.mp3" 
  },
  {
    id: "153",
    pos: "intr.,tr.",
    word: "hablar",
    definition: "definition",
    translation: "说话  会讲某种语言",
    voiceUrl: "audio_files\\153_intr.,tr._hablar_es-es.mp3" 
  },
  {
    id: "154",
    pos: "tr.",
    word: "leer",
    definition: "definition",
    translation: "阅读",
    voiceUrl: "audio_files\\154_tr._leer_es-es.mp3" 
  },
  {
    id: "155",
    pos: "tr.",
    word: "escribir",
    definition: "definition",
    translation: "写",
    voiceUrl: "audio_files\\155_tr._escribir_es-es.mp3" 
  },
  {
    id: "156",
    pos: "tr.,intr.",
    word: "entender",
    definition: "definition",
    translation: "明白   懂得",
    voiceUrl: "audio_files\\156_intr.,tr._entender_es-es.mp3" 
  },
  {
    id: "157",
    pos: "tr.",
    word: "comprender",
    definition: "definition",
    translation: "明白，理解",
    voiceUrl: "audio_files\\157_tr._comprender_es-es.mp3" 
  },
  {
    id: "158",
    pos: "tr.",
    word: "saber",
    definition: "definition",
    translation: "知道",
    voiceUrl: "audio_files\\158_tr._saber_es-es.mp3" 
  },
  {
    id: "159",
    pos: "tr.",
    word: "repetir",
    definition: "definition",
    translation: "重复",
    voiceUrl: "audio_files\\159_tr._repetir_es-es.mp3" 
  },
  {
    id: "160",
    pos: "tr.",
    word: "practicar",
    definition: "definition",
    translation: "练习",
    voiceUrl: "audio_files\\160_tr._practicar_es-es.mp3" 
  },
  {
    id: "161",
    pos: "n/a",
    word: "hacer los deberes",
    definition: "definition",
    translation: "写作业",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "162",
    pos: "n/a",
    word: "hacer un ejercicio",
    definition: "definition",
    translation: "做个练习",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "163",
    pos: "m.",
    word: "internet",
    definition: "definition",
    translation: "互联网",
    voiceUrl: "audio_files\\163_m._internet_es-es.mp3" 
  },
  {
    id: "164",
    pos: "m.",
    word: "libro",
    definition: "definition",
    translation: "书",
    voiceUrl: "audio_files\\164_m._libro_es-es.mp3" 
  },
  {
    id: "165",
    pos: "m.",
    word: "diccionario",
    definition: "definition",
    translation: "字典",
    voiceUrl: "audio_files\\165_m._diccionario_es-es.mp3" 
  },
  {
    id: "166",
    pos: "m.",
    word: "papel",
    definition: "definition",
    translation: "纸",
    voiceUrl: "audio_files\\166_m._papel_es-es.mp3" 
  },
  {
    id: "167",
    pos: "m.",
    word: "bolígrafo",
    definition: "definition",
    translation: "圆珠笔  [墨西哥] lapicero",
    voiceUrl: "audio_files\\167_m._bolígrafo_es-es.mp3" 
  },
  {
    id: "168",
    pos: "m.",
    word: "lápiz",
    definition: "definition",
    translation: "铅笔",
    voiceUrl: "audio_files\\168_m._lápiz_es-es.mp3" 
  },
  {
    id: "169",
    pos: "f.",
    word: "goma",
    definition: "definition",
    translation: "橡皮",
    voiceUrl: "audio_files\\169_f._goma_es-es.mp3" 
  },
  {
    id: "170",
    pos: "f.",
    word: "fotocopia",
    definition: "definition",
    translation: "复印件",
    voiceUrl: "audio_files\\170_f._fotocopia_es-es.mp3" 
  },
  {
    id: "171",
    pos: "f.",
    word: "silla",
    definition: "definition",
    translation: "椅子",
    voiceUrl: "audio_files\\171_f._silla_es-es.mp3" 
  },
  {
    id: "172",
    pos: "m.",
    word: "armario",
    definition: "definition",
    translation: "柜子",
    voiceUrl: "audio_files\\172_m._armario_es-es.mp3" 
  },
  {
    id: "173",
    pos: "f.",
    word: "estantería",
    definition: "definition",
    translation: "带隔板的家具",
    voiceUrl: "audio_files\\173_f._estantería_es-es.mp3" 
  },
  {
    id: "174",
    pos: "f.",
    word: "pizarra",
    definition: "definition",
    translation: "黑板",
    voiceUrl: "audio_files\\174_f._pizarra_es-es.mp3" 
  },
  {
    id: "175",
    pos: "m.",
    word: "ordenador",
    definition: "definition",
    translation: "电脑  [拉美] computadora",
    voiceUrl: "audio_files\\175_m._ordenador_es-es.mp3" 
  },
  {
    id: "176",
    pos: "m.",
    word: "mapa",
    definition: "definition",
    translation: "地图",
    voiceUrl: "audio_files\\176_m._mapa_es-es.mp3" 
  },
  {
    id: "177",
    pos: "m.,f.",
    word: "abogado",
    definition: "definition",
    translation: "律师",
    voiceUrl: "audio_files\\177_f.,m._abogado_es-es.mp3" 
  },
  {
    id: "178",
    pos: "m.,f.",
    word: "médico",
    definition: "definition",
    translation: "医生",
    voiceUrl: "audio_files\\178_f.,m._médico_es-es.mp3" 
  },
  {
    id: "179",
    pos: "m.,f.",
    word: "taxista",
    definition: "definition",
    translation: "出租车司机",
    voiceUrl: "audio_files\\179_f.,m._taxista_es-es.mp3" 
  },
  {
    id: "180",
    pos: "n/a",
    word: "ama de casa",
    definition: "definition",
    translation: "家庭主妇",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "181",
    pos: "m.,f.",
    word: "ingeniero",
    definition: "definition",
    translation: "工程师",
    voiceUrl: "audio_files\\181_f.,m._ingeniero_es-es.mp3" 
  },
  {
    id: "182",
    pos: "n/a",
    word: "dedicarse a",
    definition: "definition",
    translation: "从事…工作",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "183",
    pos: "n/a",
    word: "lugar de trabajo",
    definition: "definition",
    translation: "工作地点",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "184",
    pos: "f.",
    word: "empresa",
    definition: "definition",
    translation: "公司",
    voiceUrl: "audio_files\\184_f._empresa_es-es.mp3" 
  },
  {
    id: "185",
    pos: "f.",
    word: "oficina",
    definition: "definition",
    translation: "办公室",
    voiceUrl: "audio_files\\185_f._oficina_es-es.mp3" 
  },
  {
    id: "186",
    pos: "f.",
    word: "tienda",
    definition: "definition",
    translation: "商店",
    voiceUrl: "audio_files\\186_f._tienda_es-es.mp3" 
  },
  {
    id: "187",
    pos: "m.",
    word: "teléfono",
    definition: "definition",
    translation: "电话",
    voiceUrl: "audio_files\\187_m._teléfono_es-es.mp3" 
  },
  {
    id: "188",
    pos: "m.",
    word: "fax",
    definition: "definition",
    translation: "传真",
    voiceUrl: "audio_files\\188_m._fax_es-es.mp3" 
  },
  {
    id: "189",
    pos: "m.",
    word: "trabajo",
    definition: "definition",
    translation: "工作",
    voiceUrl: "audio_files\\189_m._trabajo_es-es.mp3" 
  },
  {
    id: "190",
    pos: "f.",
    word: "profesión",
    definition: "definition",
    translation: "职业",
    voiceUrl: "audio_files\\190_f._profesión_es-es.mp3" 
  },
  {
    id: "191",
    pos: "tr.",
    word: "comprar",
    definition: "definition",
    translation: "买",
    voiceUrl: "audio_files\\191_tr._comprar_es-es.mp3" 
  },
  {
    id: "192",
    pos: "tr.",
    word: "vender",
    definition: "definition",
    translation: "卖",
    voiceUrl: "audio_files\\192_tr._vender_es-es.mp3" 
  },
  {
    id: "193",
    pos: "n/a",
    word: "estar en paro",
    definition: "definition",
    translation: "失业",
    voiceUrl: "audio_files\\193_None_estar en paro_es-es.mp3" 
  },
  {
    id: "194",
    pos: "intr.",
    word: "trabajar",
    definition: "definition",
    translation: "工作",
    voiceUrl: "audio_files\\194_intr._trabajar_es-es.mp3" 
  },
  {
    id: "195",
    pos: "f.",
    word: "vacaciones",
    definition: "definition",
    translation: "[pl.]假期",
    voiceUrl: "audio_files\\195_f._vacaciones_es-es.mp3" 
  },
  {
    id: "196",
    pos: "m.,f.",
    word: "turista",
    definition: "definition",
    translation: "游客",
    voiceUrl: "audio_files\\196_f.,m._turista_es-es.mp3" 
  },
  {
    id: "197",
    pos: "n/a",
    word: "oficina de información",
    definition: "definition",
    translation: "信息咨询处",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "198",
    pos: "intr.",
    word: "viajar",
    definition: "definition",
    translation: "旅游",
    voiceUrl: "audio_files\\198_intr._viajar_es-es.mp3" 
  },
  {
    id: "199",
    pos: "n/a",
    word: "leer el periódico",
    definition: "definition",
    translation: "读报纸",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "200",
    pos: "n/a",
    word: "leer un libro",
    definition: "definition",
    translation: "读本书",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "201",
    pos: "n/a",
    word: "leer una revista",
    definition: "definition",
    translation: "读本杂志",
    voiceUrl: "audio_files\\201_None_leer una revista_es-es.mp3" 
  },
  {
    id: "202",
    pos: "n/a",
    word: "ver la televisión",
    definition: "definition",
    translation: "看电视",
    voiceUrl: "audio_files\\202_None_ver la televisión_es-es.mp3" 
  },
  {
    id: "203",
    pos: "n/a",
    word: "ver una película",
    definition: "definition",
    translation: "看一部电影",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "204",
    pos: "n/a",
    word: "escuchar música",
    definition: "definition",
    translation: "听音乐",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "205",
    pos: "n/a",
    word: "escuchar la radio",
    definition: "definition",
    translation: "听广播",
    voiceUrl: "audio_files\\205_None_escuchar la radio_es-es.mp3" 
  },
  {
    id: "206",
    pos: "n/a",
    word: "escuchar una canción",
    definition: "definition",
    translation: "听首歌",
    voiceUrl: "audio_files\\206_None_escuchar una canción_es-es.mp3" 
  },
  {
    id: "207",
    pos: "n/a",
    word: "ir a un café",
    definition: "definition",
    translation: "去家咖啡厅",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "208",
    pos: "n/a",
    word: "ir a un restaurante",
    definition: "definition",
    translation: "去家餐厅",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "209",
    pos: "n/a",
    word: "ir a un museo",
    definition: "definition",
    translation: "去家博物馆",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "210",
    pos: "n/a",
    word: "ir al cine",
    definition: "definition",
    translation: "去电影院",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "211",
    pos: "n/a",
    word: "ir al teatro",
    definition: "definition",
    translation: "去剧院",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "212",
    pos: "n/a",
    word: "ir al parque",
    definition: "definition",
    translation: "去公园",
    voiceUrl: "audio_files\\212_None_ir al parque_es-es.mp3" 
  },
  {
    id: "213",
    pos: "n/a",
    word: "ir al circo",
    definition: "definition",
    translation: "去看马戏",
    voiceUrl: "audio_files\\213_None_ir al circo_es-es.mp3" 
  },
  {
    id: "214",
    pos: "intr.",
    word: "cantar",
    definition: "definition",
    translation: "唱歌",
    voiceUrl: "audio_files\\214_intr._cantar_es-es.mp3" 
  },
  {
    id: "215",
    pos: "intr.",
    word: "bailar",
    definition: "definition",
    translation: "跳舞",
    voiceUrl: "audio_files\\215_intr._bailar_es-es.mp3" 
  },
  {
    id: "216",
    pos: "f.",
    word: "película",
    definition: "definition",
    translation: "电影",
    voiceUrl: "audio_files\\216_f._película_es-es.mp3" 
  },
  {
    id: "217",
    pos: "m.",
    word: "concierto",
    definition: "definition",
    translation: "音乐会",
    voiceUrl: "audio_files\\217_m._concierto_es-es.mp3" 
  },
  {
    id: "218",
    pos: "intr.",
    word: "correr",
    definition: "definition",
    translation: "跑步",
    voiceUrl: "audio_files\\218_intr._correr_es-es.mp3" 
  },
  {
    id: "219",
    pos: "intr.",
    word: "nadar",
    definition: "definition",
    translation: "游泳",
    voiceUrl: "audio_files\\219_intr._nadar_es-es.mp3" 
  },
  {
    id: "220",
    pos: "intr.",
    word: "esquiar",
    definition: "definition",
    translation: "滑雪",
    voiceUrl: "audio_files\\220_intr._esquiar_es-es.mp3" 
  },
  {
    id: "221",
    pos: "n/a",
    word: "hacer deporte",
    definition: "definition",
    translation: "做体育运动",
    voiceUrl: "audio_files\\221_None_hacer deporte_es-es.mp3" 
  },
  {
    id: "222",
    pos: "n/a",
    word: "hacer ejercicio",
    definition: "definition",
    translation: "做运动",
    voiceUrl: "audio_files\\222_None_hacer ejercicio_es-es.mp3" 
  },
  {
    id: "223",
    pos: "n/a",
    word: "hacer gimnasia",
    definition: "definition",
    translation: "做体操",
    voiceUrl: "audio_files\\223_None_hacer gimnasia_es-es.mp3" 
  },
  {
    id: "224",
    pos: "n/a",
    word: "jugar al fútbol",
    definition: "definition",
    translation: "踢足球",
    voiceUrl: "audio_files\\224_None_jugar al fútbol_es-es.mp3" 
  },
  {
    id: "225",
    pos: "n/a",
    word: "jugar al baloncesto",
    definition: "definition",
    translation: "打篮球",
    voiceUrl: "audio_files\\225_None_jugar al baloncesto_es-es.mp3" 
  },
  {
    id: "226",
    pos: "n/a",
    word: "jugar al tenis",
    definition: "definition",
    translation: "打网球",
    voiceUrl: "audio_files\\226_None_jugar al tenis_es-es.mp3" 
  },
  {
    id: "227",
    pos: "m.",
    word: "juego",
    definition: "definition",
    translation: "游戏",
    voiceUrl: "audio_files\\227_m._juego_es-es.mp3" 
  },
  {
    id: "228",
    pos: "m.",
    word: "sobre",
    definition: "definition",
    translation: "信封",
    voiceUrl: "audio_files\\228_m._sobre_es-es.mp3" 
  },
  {
    id: "229",
    pos: "m.",
    word: "sello",
    definition: "definition",
    translation: "印章",
    voiceUrl: "audio_files\\229_m._sello_es-es.mp3" 
  },
  {
    id: "230",
    pos: "n/a",
    word: "escribir una postal",
    definition: "definition",
    translation: "写张明信片",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "231",
    pos: "n/a",
    word: "escribir una carta",
    definition: "definition",
    translation: "写封信",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "232",
    pos: "n/a",
    word: "escribir un correo electrónico",
    definition: "definition",
    translation: "写封电子邮件",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "233",
    pos: "n/a",
    word: "teléfono fijo",
    definition: "definition",
    translation: "固定电话",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "234",
    pos: "m.",
    word: "quiosco",
    definition: "definition",
    translation: "报亭",
    voiceUrl: "audio_files\\234_m._quiosco_es-es.mp3" 
  },
  {
    id: "235",
    pos: "f.",
    word: "arroba",
    definition: "definition",
    translation: "@（艾特）",
    voiceUrl: "audio_files\\235_f._arroba_es-es.mp3" 
  },
  {
    id: "236",
    pos: "m.",
    word: "guión",
    definition: "definition",
    translation: "连字符号[-]",
    voiceUrl: "audio_files\\236_m._guión_es-es.mp3" 
  },
  {
    id: "237",
    pos: "n/a",
    word: "guión bajo",
    definition: "definition",
    translation: "下划线",
    voiceUrl: "audio_files\\237_None_guión bajo_es-es.mp3" 
  },
  {
    id: "238",
    pos: "m.",
    word: "punto",
    definition: "definition",
    translation: "句号，点",
    voiceUrl: "audio_files\\238_m._punto_es-es.mp3" 
  },
  {
    id: "239",
    pos: "n/a",
    word: "página web",
    definition: "definition",
    translation: "网页",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "240",
    pos: "f.",
    word: "casa",
    definition: "definition",
    translation: "家",
    voiceUrl: "audio_files\\240_f._casa_es-es.mp3" 
  },
  {
    id: "241",
    pos: "m.",
    word: "piso",
    definition: "definition",
    translation: "公寓，地面，层",
    voiceUrl: "audio_files\\241_m._piso_es-es.mp3" 
  },
  {
    id: "242",
    pos: "m.",
    word: "apartamento",
    definition: "definition",
    translation: "公寓",
    voiceUrl: "audio_files\\242_m._apartamento_es-es.mp3" 
  },
  {
    id: "243",
    pos: "m.",
    word: "estudio",
    definition: "definition",
    translation: "单身公寓，工作室",
    voiceUrl: "audio_files\\243_m._estudio_es-es.mp3" 
  },
  {
    id: "244",
    pos: "f.",
    word: "habitación",
    definition: "definition",
    translation: "房间",
    voiceUrl: "audio_files\\244_f._habitación_es-es.mp3" 
  },
  {
    id: "245",
    pos: "m.",
    word: "ascensor",
    definition: "definition",
    translation: "电梯",
    voiceUrl: "audio_files\\245_m._ascensor_es-es.mp3" 
  },
  {
    id: "246",
    pos: "f.",
    word: "escalera",
    definition: "definition",
    translation: "楼梯",
    voiceUrl: "audio_files\\246_f._escalera_es-es.mp3" 
  },
  {
    id: "247",
    pos: "f.",
    word: "terraza",
    definition: "definition",
    translation: "露台",
    voiceUrl: "audio_files\\247_f._terraza_es-es.mp3" 
  },
  {
    id: "248",
    pos: "m.",
    word: "jardín",
    definition: "definition",
    translation: "花园",
    voiceUrl: "audio_files\\248_m._jardín_es-es.mp3" 
  },
  {
    id: "249",
    pos: "f.",
    word: "ventana",
    definition: "definition",
    translation: "窗户",
    voiceUrl: "audio_files\\249_f._ventana_es-es.mp3" 
  },
  {
    id: "250",
    pos: "f.",
    word: "puerta",
    definition: "definition",
    translation: "门",
    voiceUrl: "audio_files\\250_f._puerta_es-es.mp3" 
  },
  {
    id: "251",
    pos: "n/a",
    word: "sala de estar",
    definition: "definition",
    translation: "客厅",
    voiceUrl: "audio_files\\251_None_sala de estar_es-es.mp3" 
  },
  {
    id: "252",
    pos: "m.",
    word: "dormitorio",
    definition: "definition",
    translation: "寝室，宿舍",
    voiceUrl: "audio_files\\252_m._dormitorio_es-es.mp3" 
  },
  {
    id: "253",
    pos: "f.",
    word: "cocina",
    definition: "definition",
    translation: "厨房",
    voiceUrl: "audio_files\\253_f._cocina_es-es.mp3" 
  },
  {
    id: "254",
    pos: "m.",
    word: "baño",
    definition: "definition",
    translation: "卫生间",
    voiceUrl: "audio_files\\254_m._baño_es-es.mp3" 
  },
  {
    id: "255",
    pos: "m.",
    word: "salón",
    definition: "definition",
    translation: "大厅, 沙龙，展厅",
    voiceUrl: "audio_files\\255_m._salón_es-es.mp3" 
  },
  {
    id: "256",
    pos: "m.",
    word: "garaje",
    definition: "definition",
    translation: "车库",
    voiceUrl: "audio_files\\256_m._garaje_es-es.mp3" 
  },
  {
    id: "257",
    pos: "n/a",
    word: "bien comunicado",
    definition: "definition",
    translation: "交通便利的",
    voiceUrl: "audio_files\\257_None_bien comunicado_es-es.mp3" 
  },
  {
    id: "258",
    pos: "n/a",
    word: "mal comunicado",
    definition: "definition",
    translation: "交通不便的",
    voiceUrl: "audio_files\\258_None_mal comunicado_es-es.mp3" 
  },
  {
    id: "259",
    pos: "n/a",
    word: "tener ascensor",
    definition: "definition",
    translation: "配有电梯",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "260",
    pos: "n/a",
    word: "aire acondicionado",
    definition: "definition",
    translation: "空调",
    voiceUrl: "audio_files\\260_None_aire acondicionado_es-es.mp3" 
  },
  {
    id: "261",
    pos: "f.",
    word: "calefacción",
    definition: "definition",
    translation: "暖气",
    voiceUrl: "audio_files\\261_f._calefacción_es-es.mp3" 
  },
  {
    id: "262",
    pos: "f.",
    word: "cama",
    definition: "definition",
    translation: "床",
    voiceUrl: "audio_files\\262_f._cama_es-es.mp3" 
  },
  {
    id: "263",
    pos: "m.",
    word: "sofá",
    definition: "definition",
    translation: "沙发",
    voiceUrl: "audio_files\\263_m._sofá_es-es.mp3" 
  },
  {
    id: "264",
    pos: "m.",
    word: "sillón",
    definition: "definition",
    translation: "大扶手椅",
    voiceUrl: "audio_files\\264_m._sillón_es-es.mp3" 
  },
  {
    id: "265",
    pos: "m.",
    word: "lavabo",
    definition: "definition",
    translation: "洗手间",
    voiceUrl: "audio_files\\265_m._lavabo_es-es.mp3" 
  },
  {
    id: "266",
    pos: "m.",
    word: "vídeo",
    definition: "definition",
    translation: "视频   [拉美]  video",
    voiceUrl: "audio_files\\266_m._vídeo_es-es.mp3" 
  },
  {
    id: "267",
    pos: "f.",
    word: "carta",
    definition: "definition",
    translation: "信",
    voiceUrl: "audio_files\\267_f._carta_es-es.mp3" 
  },
  {
    id: "268",
    pos: "f.",
    word: "postal",
    definition: "definition",
    translation: "明信片",
    voiceUrl: "audio_files\\268_f._postal_es-es.mp3" 
  },
  {
    id: "269",
    pos: "m.",
    word: "banco",
    definition: "definition",
    translation: "银行",
    voiceUrl: "audio_files\\269_m._banco_es-es.mp3" 
  },
  {
    id: "270",
    pos: "m.",
    word: "dinero",
    definition: "definition",
    translation: "钱",
    voiceUrl: "audio_files\\270_m._dinero_es-es.mp3" 
  },
  {
    id: "271",
    pos: "m.",
    word: "euro",
    definition: "definition",
    translation: "欧元",
    voiceUrl: "audio_files\\271_m._euro_es-es.mp3" 
  },
  {
    id: "272",
    pos: "n/a",
    word: "cambiar dinero",
    definition: "definition",
    translation: "换钱",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "273",
    pos: "m.",
    word: "hospital",
    definition: "definition",
    translation: "医院",
    voiceUrl: "audio_files\\273_m._hospital_es-es.mp3" 
  },
  {
    id: "274",
    pos: "m.,f.",
    word: "enfermera",
    definition: "definition",
    translation: "护士",
    voiceUrl: "audio_files\\274_f.,m._enfermera_es-es.mp3" 
  },
  {
    id: "275",
    pos: "m.,f.",
    word: "policía",
    definition: "definition",
    translation: "警察",
    voiceUrl: "audio_files\\275_f.,m._policía_es-es.mp3" 
  },
  {
    id: "276",
    pos: "m.,f.",
    word: "bombero",
    definition: "definition",
    translation: "消防员",
    voiceUrl: "audio_files\\276_f.,m._bombero_es-es.mp3" 
  },
  {
    id: "277",
    pos: "m.",
    word: "supermercado",
    definition: "definition",
    translation: "超市",
    voiceUrl: "audio_files\\277_m._supermercado_es-es.mp3" 
  },
  {
    id: "278",
    pos: "m.",
    word: "mercado",
    definition: "definition",
    translation: "市场",
    voiceUrl: "audio_files\\278_m._mercado_es-es.mp3" 
  },
  {
    id: "279",
    pos: "f.",
    word: "entrada",
    definition: "definition",
    translation: "入口",
    voiceUrl: "audio_files\\279_f._entrada_es-es.mp3" 
  },
  {
    id: "280",
    pos: "f.",
    word: "salida",
    definition: "definition",
    translation: "出口",
    voiceUrl: "audio_files\\280_f._salida_es-es.mp3" 
  },
  {
    id: "281",
    pos: "f.",
    word: "información",
    definition: "definition",
    translation: "信息",
    voiceUrl: "audio_files\\281_f._información_es-es.mp3" 
  },
  {
    id: "282",
    pos: "m.,f.",
    word: "comprador",
    definition: "definition",
    translation: "买家",
    voiceUrl: "audio_files\\282_f.,m._comprador_es-es.mp3" 
  },
  {
    id: "283",
    pos: "m.,f.",
    word: "vendedor",
    definition: "definition",
    translation: "卖家",
    voiceUrl: "audio_files\\283_f.,m._vendedor_es-es.mp3" 
  },
  {
    id: "284",
    pos: "m.",
    word: "pantalón",
    definition: "definition",
    translation: "裤子",
    voiceUrl: "audio_files\\284_m._pantalón_es-es.mp3" 
  },
  {
    id: "285",
    pos: "m.",
    word: "vaqueros",
    definition: "definition",
    translation: "[pl.]牛仔裤  [墨西哥] pantalónes de mezclilla",
    voiceUrl: "audio_files\\285_m._vaqueros_es-es.mp3" 
  },
  {
    id: "286",
    pos: "f.",
    word: "falda",
    definition: "definition",
    translation: "半身裙",
    voiceUrl: "audio_files\\286_f._falda_es-es.mp3" 
  },
  {
    id: "287",
    pos: "f.",
    word: "camisa",
    definition: "definition",
    translation: "衬衫",
    voiceUrl: "audio_files\\287_f._camisa_es-es.mp3" 
  },
  {
    id: "288",
    pos: "m.",
    word: "jersey",
    definition: "definition",
    translation: "针织衫，运动衫  [墨西哥] suéter",
    voiceUrl: "audio_files\\288_m._jersey_es-es.mp3" 
  },
  {
    id: "289",
    pos: "m.",
    word: "zapatos",
    definition: "definition",
    translation: "[pl.] 鞋子",
    voiceUrl: "audio_files\\289_m._zapatos_es-es.mp3" 
  },
  {
    id: "290",
    pos: "m.",
    word: "bolso",
    definition: "definition",
    translation: "手提包",
    voiceUrl: "audio_files\\290_m._bolso_es-es.mp3" 
  },
  {
    id: "291",
    pos: "m.",
    word: "precio",
    definition: "definition",
    translation: "价钱",
    voiceUrl: "audio_files\\291_m._precio_es-es.mp3" 
  },
  {
    id: "292",
    pos: "m.",
    word: "billete",
    definition: "definition",
    translation: "票，钱币  在[拉美]billete表示钱币，票则用boleto",
    voiceUrl: "audio_files\\292_m._billete_es-es.mp3" 
  },
  {
    id: "293",
    pos: "n/a",
    word: "pagar con tarjeta",
    definition: "definition",
    translation: "刷卡付款",
    voiceUrl: "audio_files\\293_None_pagar con tarjeta_es-es.mp3" 
  },
  {
    id: "294",
    pos: "n/a",
    word: "tarjeta de crédito",
    definition: "definition",
    translation: "信用卡",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "295",
    pos: "n/a",
    word: "estar enfermo",
    definition: "definition",
    translation: "生病",
    voiceUrl: "audio_files\\295_None_estar enfermo_es-es.mp3" 
  },
  {
    id: "296",
    pos: "n/a",
    word: "ir al hospital",
    definition: "definition",
    translation: "去医院",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "297",
    pos: "n/a",
    word: "ir al médico",
    definition: "definition",
    translation: "去看医生",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "298",
    pos: "f.",
    word: "farmacia",
    definition: "definition",
    translation: "药店",
    voiceUrl: "audio_files\\298_f._farmacia_es-es.mp3" 
  },
  {
    id: "299",
    pos: "m.",
    word: "jabón",
    definition: "definition",
    translation: "肥皂",
    voiceUrl: "audio_files\\299_m._jabón_es-es.mp3" 
  },
  {
    id: "300",
    pos: "n/a",
    word: "lavarse la cara",
    definition: "definition",
    translation: "洗脸",
    voiceUrl: "audio_files\\300_None_lavarse la cara_es-es.mp3" 
  },
  {
    id: "301",
    pos: "n/a",
    word: "lavarse las manos",
    definition: "definition",
    translation: "洗手",
    voiceUrl: "audio_files\\301_None_lavarse las manos_es-es.mp3" 
  },
  {
    id: "302",
    pos: "n/a",
    word: "lavarse el pelo",
    definition: "definition",
    translation: "洗头",
    voiceUrl: "audio_files\\302_None_lavarse el pelo_es-es.mp3" 
  },
  {
    id: "303",
    pos: "n/a",
    word: "lavarse los dientes",
    definition: "definition",
    translation: "刷牙",
    voiceUrl: "audio_files\\303_None_lavarse los dientes_es-es.mp3" 
  },
  {
    id: "304",
    pos: "prnl.",
    word: "ducharse",
    definition: "definition",
    translation: "淋浴，洗澡",
    voiceUrl: "audio_files\\304_prnl._ducharse_es-es.mp3" 
  },
  {
    id: "305",
    pos: "prnl.",
    word: "bañarse",
    definition: "definition",
    translation: "沐浴，洗澡",
    voiceUrl: "audio_files\\305_prnl._bañarse_es-es.mp3" 
  },
  {
    id: "306",
    pos: "n/a",
    word: "carné de identidad",
    definition: "definition",
    translation: "身份证",
    voiceUrl: "audio_files\\306_None_carné de identidad_es-es.mp3" 
  },
  {
    id: "307",
    pos: "m.",
    word: "pasaporte",
    definition: "definition",
    translation: "护照",
    voiceUrl: "audio_files\\307_m._pasaporte_es-es.mp3" 
  },
  {
    id: "308",
    pos: "n/a",
    word: "carné de conducir",
    definition: "definition",
    translation: "驾照  [墨西哥] licencia de manejo",
    voiceUrl: "audio_files\\308_None_carné de conducir_es-es.mp3" 
  },
  {
    id: "309",
    pos: "f.",
    word: "publicidad",
    definition: "definition",
    translation: "广告",
    voiceUrl: "audio_files\\309_f._publicidad_es-es.mp3" 
  },
  {
    id: "310",
    pos: "f.",
    word: "maleta",
    definition: "definition",
    translation: "行李箱",
    voiceUrl: "audio_files\\310_f._maleta_es-es.mp3" 
  },
  {
    id: "311",
    pos: "n/a",
    word: "comprar un billete",
    definition: "definition",
    translation: "买一张票   [拉美] comprar un boleto",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "312",
    pos: "n/a",
    word: "comprar un billete de ida",
    definition: "definition",
    translation: "买一张去程票  [拉美]comprar un boleto de ida",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "313",
    pos: "n/a",
    word: "comprar un billete de ida y vuelta",
    definition: "definition",
    translation: "买往返票  [拉美]comprar un boleto de ida y vuelta",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "314",
    pos: "m.",
    word: "horario",
    definition: "definition",
    translation: "时刻表",
    voiceUrl: "audio_files\\314_m._horario_es-es.mp3" 
  },
  {
    id: "315",
    pos: "n/a",
    word: "ir a Madrid",
    definition: "definition",
    translation: "去马德里",
    voiceUrl: "audio_files\\315_None_ir a Madrid_es-es.mp3" 
  },
  {
    id: "316",
    pos: "n/a",
    word: "ir a la playa",
    definition: "definition",
    translation: "去海滩",
    voiceUrl: "audio_files\\316_None_ir a la playa_es-es.mp3" 
  },
  {
    id: "317",
    pos: "n/a",
    word: "ir a la montaña",
    definition: "definition",
    translation: "去山上",
    voiceUrl: "audio_files\\317_None_ir a la montaña_es-es.mp3" 
  },
  {
    id: "318",
    pos: "m.",
    word: "hotel",
    definition: "definition",
    translation: "酒店",
    voiceUrl: "audio_files\\318_m._hotel_es-es.mp3" 
  },
  {
    id: "319",
    pos: "m.",
    word: "camping",
    definition: "definition",
    translation: "野营",
    voiceUrl: "audio_files\\319_m._camping_es-es.mp3" 
  },
  {
    id: "320",
    pos: "n/a",
    word: "habitación doble",
    definition: "definition",
    translation: "双人间",
    voiceUrl: "audio_files\\320_None_habitación doble_es-es.mp3" 
  },
  {
    id: "321",
    pos: "n/a",
    word: "habitación individual",
    definition: "definition",
    translation: "单人间",
    voiceUrl: "audio_files\\321_None_habitación individual_es-es.mp3" 
  },
  {
    id: "322",
    pos: "f.",
    word: "carretera",
    definition: "definition",
    translation: "公路，大路",
    voiceUrl: "audio_files\\322_f._carretera_es-es.mp3" 
  },
  {
    id: "323",
    pos: "m.",
    word: "aeropuerto",
    definition: "definition",
    translation: "飞机场",
    voiceUrl: "audio_files\\323_m._aeropuerto_es-es.mp3" 
  },
  {
    id: "324",
    pos: "m.",
    word: "puerto",
    definition: "definition",
    translation: "港口",
    voiceUrl: "audio_files\\324_m._puerto_es-es.mp3" 
  },
  {
    id: "325",
    pos: "n/a",
    word: "estación de tren",
    definition: "definition",
    translation: "火车站",
    voiceUrl: "audio_files\\325_None_estación de tren_es-es.mp3" 
  },
  {
    id: "326",
    pos: "n/a",
    word: "estación de metro",
    definition: "definition",
    translation: "地铁站",
    voiceUrl: "audio_files\\326_None_estación de metro_es-es.mp3" 
  },
  {
    id: "327",
    pos: "n/a",
    word: "parada de autobús",
    definition: "definition",
    translation: "公交车站",
    voiceUrl: "audio_files\\327_None_parada de autobús_es-es.mp3" 
  },
  {
    id: "328",
    pos: "n/a",
    word: "parada de taxi",
    definition: "definition",
    translation: "出租车停靠站",
    voiceUrl: "audio_files\\328_None_parada de taxi_es-es.mp3" 
  },
  {
    id: "329",
    pos: "n/a",
    word: "ir andando",
    definition: "definition",
    translation: "走路去",
    voiceUrl: "audio_files\\329_None_ir andando_es-es.mp3" 
  },
  {
    id: "330",
    pos: "n/a",
    word: "ir en coche",
    definition: "definition",
    translation: "乘/开车去",
    voiceUrl: "audio_files\\330_None_ir en coche_es-es.mp3" 
  },
  {
    id: "331",
    pos: "n/a",
    word: "ir en taxi",
    definition: "definition",
    translation: "乘坐出租车去",
    voiceUrl: "audio_files\\331_None_ir en taxi_es-es.mp3" 
  },
  {
    id: "332",
    pos: "n/a",
    word: "ir en tren",
    definition: "definition",
    translation: "坐火车去",
    voiceUrl: "audio_files\\332_None_ir en tren_es-es.mp3" 
  },
  {
    id: "333",
    pos: "n/a",
    word: "ir en metro",
    definition: "definition",
    translation: "坐地铁去",
    voiceUrl: "audio_files\\333_None_ir en metro_es-es.mp3" 
  },
  {
    id: "334",
    pos: "n/a",
    word: "ir en autobús",
    definition: "definition",
    translation: "坐公交车去",
    voiceUrl: "audio_files\\334_None_ir en autobús_es-es.mp3" 
  },
  {
    id: "335",
    pos: "n/a",
    word: "ir en avión",
    definition: "definition",
    translation: "坐飞机去",
    voiceUrl: "audio_files\\335_None_ir en avión_es-es.mp3" 
  },
  {
    id: "336",
    pos: "n/a",
    word: "ir en barco",
    definition: "definition",
    translation: "乘船去",
    voiceUrl: "audio_files\\336_None_ir en barco_es-es.mp3" 
  },
  {
    id: "337",
    pos: "m.,f.",
    word: "conductor",
    definition: "definition",
    translation: "司机",
    voiceUrl: "audio_files\\337_f.,m._conductor_es-es.mp3" 
  },
  {
    id: "338",
    pos: "m.",
    word: "aparcamiento",
    definition: "definition",
    translation: "停车场",
    voiceUrl: "audio_files\\338_m._aparcamiento_es-es.mp3" 
  },
  {
    id: "339",
    pos: "n/a",
    word: "transporte por tierra",
    definition: "definition",
    translation: "陆地交通运输",
    voiceUrl: "audio_files\\339_None_transporte por tierra_es-es.mp3" 
  },
  {
    id: "340",
    pos: "n/a",
    word: "transporte marítimo y fluvial",
    definition: "definition",
    translation: "海洋和河流交通运输",
    voiceUrl: "audio_files\\340_None_transporte marítimo y fluvial_es-es.mp3" 
  },
  {
    id: "341",
    pos: "n/a",
    word: "transporte aéreo",
    definition: "definition",
    translation: "航空交通运输",
    voiceUrl: "audio_files\\341_None_transporte aéreo_es-es.mp3" 
  },
  {
    id: "342",
    pos: "adj.",
    word: "caro",
    definition: "definition",
    translation: "贵的",
    voiceUrl: "audio_files\\342_adj._caro_es-es.mp3" 
  },
  {
    id: "343",
    pos: "adj.",
    word: "barato",
    definition: "definition",
    translation: "便宜的",
    voiceUrl: "audio_files\\343_adj._barato_es-es.mp3" 
  },
  {
    id: "344",
    pos: "f.",
    word: "capital",
    definition: "definition",
    translation: "首都",
    voiceUrl: "audio_files\\344_f._capital_es-es.mp3" 
  },
  {
    id: "345",
    pos: "m.,f.",
    word: "presidente",
    definition: "definition",
    translation: "主席，总统",
    voiceUrl: "audio_files\\345_f.,m._presidente_es-es.mp3" 
  },
  {
    id: "346",
    pos: "m.",
    word: "rey",
    definition: "definition",
    translation: "国王",
    voiceUrl: "audio_files\\346_m._rey_es-es.mp3" 
  },
  {
    id: "347",
    pos: "f.",
    word: "reina",
    definition: "definition",
    translation: "女王",
    voiceUrl: "audio_files\\347_f._reina_es-es.mp3" 
  },
  {
    id: "348",
    pos: "m.",
    word: "cine",
    definition: "definition",
    translation: "电影院",
    voiceUrl: "audio_files\\348_m._cine_es-es.mp3" 
  },
  {
    id: "349",
    pos: "m.",
    word: "teatro",
    definition: "definition",
    translation: "剧院",
    voiceUrl: "audio_files\\349_m._teatro_es-es.mp3" 
  },
  {
    id: "350",
    pos: "f.",
    word: "música",
    definition: "definition",
    translation: "音乐",
    voiceUrl: "audio_files\\350_f._música_es-es.mp3" 
  },
  {
    id: "351",
    pos: "f.",
    word: "foto",
    definition: "definition",
    translation: "照片",
    voiceUrl: "audio_files\\351_f._foto_es-es.mp3" 
  },
  {
    id: "352",
    pos: "m.",
    word: "museo",
    definition: "definition",
    translation: "博物馆",
    voiceUrl: "audio_files\\352_m._museo_es-es.mp3" 
  },
  {
    id: "353",
    pos: "f.",
    word: "exposición",
    definition: "definition",
    translation: "展览",
    voiceUrl: "audio_files\\353_f._exposición_es-es.mp3" 
  },
  {
    id: "354",
    pos: "n/a",
    word: "ser interesante",
    definition: "definition",
    translation: "有意思",
    voiceUrl: "audio_files\\354_None_ser interesante_es-es.mp3" 
  },
  {
    id: "355",
    pos: "m.,f.",
    word: "cantante",
    definition: "definition",
    translation: "歌手",
    voiceUrl: "audio_files\\355_f.,m._cantante_es-es.mp3" 
  },
  {
    id: "356",
    pos: "m.",
    word: "edificio",
    definition: "definition",
    translation: "建筑物",
    voiceUrl: "audio_files\\356_m._edificio_es-es.mp3" 
  },
  {
    id: "357",
    pos: "m.",
    word: "monumento",
    definition: "definition",
    translation: "纪念碑",
    voiceUrl: "audio_files\\357_m._monumento_es-es.mp3" 
  },
  {
    id: "358",
    pos: "f.",
    word: "catedral",
    definition: "definition",
    translation: "大教堂",
    voiceUrl: "audio_files\\358_f._catedral_es-es.mp3" 
  },
  {
    id: "359",
    pos: "f.",
    word: "iglesia",
    definition: "definition",
    translation: "教堂",
    voiceUrl: "audio_files\\359_f._iglesia_es-es.mp3" 
  },
  {
    id: "360",
    pos: "m.",
    word: "actor",
    definition: "definition",
    translation: "男演员",
    voiceUrl: "audio_files\\360_m._actor_es-es.mp3" 
  },
  {
    id: "361",
    pos: "f.",
    word: "actriz",
    definition: "definition",
    translation: "女演员",
    voiceUrl: "audio_files\\361_f._actriz_es-es.mp3" 
  },
  {
    id: "362",
    pos: "f.",
    word: "religión",
    definition: "definition",
    translation: "宗教",
    voiceUrl: "audio_files\\362_f._religión_es-es.mp3" 
  },
  {
    id: "363",
    pos: "adj.,m.,f.",
    word: "cristiano",
    definition: "definition",
    translation: "基督教的,  基督教教徒",
    voiceUrl: "audio_files\\363_adj.,f.,m._cristiano_es-es.mp3" 
  },
  {
    id: "364",
    pos: "adj.,m.,f.",
    word: "judío",
    definition: "definition",
    translation: "犹太人的, 犹太人 犹太教徒",
    voiceUrl: "audio_files\\364_adj.,f.,m._judío_es-es.mp3" 
  },
  {
    id: "365",
    pos: "adj.,m.,f.",
    word: "musulmán",
    definition: "definition",
    translation: "穆斯林的,  穆斯林",
    voiceUrl: "audio_files\\365_adj.,f.,m._musulmán_es-es.mp3" 
  },
  {
    id: "366",
    pos: "adj.,m.,f.",
    word: "budista",
    definition: "definition",
    translation: "佛教的,  佛教徒",
    voiceUrl: "audio_files\\366_adj.,f.,m._budista_es-es.mp3" 
  },
  {
    id: "367",
    pos: "n/a",
    word: "ir a la iglesia",
    definition: "definition",
    translation: "去教堂",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "368",
    pos: "n/a",
    word: "ir a la mezquita",
    definition: "definition",
    translation: "去清真寺",
    voiceUrl: "audio_files\\368_None_ir a la mezquita_es-es.mp3" 
  },
  {
    id: "369",
    pos: "n/a",
    word: "ir a la sinagoga",
    definition: "definition",
    translation: "去犹太教堂",
    voiceUrl: "audio_files\\None" 
  },
  {
    id: "370",
    pos: "m.",
    word: "sol",
    definition: "definition",
    translation: "太阳",
    voiceUrl: "audio_files\\370_m._sol_es-es.mp3" 
  },
  {
    id: "371",
    pos: "m.",
    word: "lugar",
    definition: "definition",
    translation: "地方",
    voiceUrl: "audio_files\\371_m._lugar_es-es.mp3" 
  },
  {
    id: "372",
    pos: "m.",
    word: "norte",
    definition: "definition",
    translation: "北部",
    voiceUrl: "audio_files\\372_m._norte_es-es.mp3" 
  },
  {
    id: "373",
    pos: "m.",
    word: "sur",
    definition: "definition",
    translation: "南部",
    voiceUrl: "audio_files\\373_m._sur_es-es.mp3" 
  },
  {
    id: "374",
    pos: "m.",
    word: "este",
    definition: "definition",
    translation: "东部",
    voiceUrl: "audio_files\\374_m._este_es-es.mp3" 
  },
  {
    id: "375",
    pos: "m.",
    word: "oeste",
    definition: "definition",
    translation: "西部",
    voiceUrl: "audio_files\\375_m._oeste_es-es.mp3" 
  },
  {
    id: "376",
    pos: "f.",
    word: "plaza",
    definition: "definition",
    translation: "广场",
    voiceUrl: "audio_files\\376_f._plaza_es-es.mp3" 
  },
  {
    id: "377",
    pos: "n/a",
    word: "centro comercial",
    definition: "definition",
    translation: "购物中心",
    voiceUrl: "audio_files\\377_None_centro comercial_es-es.mp3" 
  },
  {
    id: "378",
    pos: "m.",
    word: "colegio",
    definition: "definition",
    translation: "学院，学校",
    voiceUrl: "audio_files\\378_m._colegio_es-es.mp3" 
  },
  {
    id: "379",
    pos: "f.",
    word: "escuela",
    definition: "definition",
    translation: "学校",
    voiceUrl: "audio_files\\379_f._escuela_es-es.mp3" 
  },
  {
    id: "380",
    pos: "f.",
    word: "primavera",
    definition: "definition",
    translation: "春天",
    voiceUrl: "audio_files\\380_f._primavera_es-es.mp3" 
  },
  {
    id: "381",
    pos: "m.",
    word: "verano",
    definition: "definition",
    translation: "夏天",
    voiceUrl: "audio_files\\381_m._verano_es-es.mp3" 
  },
  {
    id: "382",
    pos: "m.",
    word: "otoño",
    definition: "definition",
    translation: "秋天",
    voiceUrl: "audio_files\\382_m._otoño_es-es.mp3" 
  },
  {
    id: "383",
    pos: "m.",
    word: "invierno",
    definition: "definition",
    translation: "冬天",
    voiceUrl: "audio_files\\383_m._invierno_es-es.mp3" 
  },
  {
    id: "384",
    pos: "impers.",
    word: "llover",
    definition: "definition",
    translation: "下雨",
    voiceUrl: "audio_files\\384_impers._llover_es-es.mp3" 
  },
  {
    id: "385",
    pos: "impers.",
    word: "nevar",
    definition: "definition",
    translation: "下雪",
    voiceUrl: "audio_files\\385_impers._nevar_es-es.mp3" 
  },
  {
    id: "386",
    pos: "n/a",
    word: "hace frío",
    definition: "definition",
    translation: "天气寒冷",
    voiceUrl: "audio_files\\386_None_hace frío_es-es.mp3" 
  },
  {
    id: "387",
    pos: "n/a",
    word: "hace calor",
    definition: "definition",
    translation: "天气炎热",
    voiceUrl: "audio_files\\387_None_hace calor_es-es.mp3" 
  },
  {
    id: "388",
    pos: "n/a",
    word: "hace sol",
    definition: "definition",
    translation: "阳光明媚",
    voiceUrl: "audio_files\\388_None_hace sol_es-es.mp3" 
  },
  {
    id: "389",
    pos: "n/a",
    word: "hace viento",
    definition: "definition",
    translation: "刮风",
    voiceUrl: "audio_files\\389_None_hace viento_es-es.mp3" 
  },
  {
    id: "390",
    pos: "n/a",
    word: "hace buen tiempo",
    definition: "definition",
    translation: "好天气",
    voiceUrl: "audio_files\\390_None_hace buen tiempo_es-es.mp3" 
  },
  {
    id: "391",
    pos: "n/a",
    word: "hace mal tiempo",
    definition: "definition",
    translation: "天气不好",
    voiceUrl: "audio_files\\391_None_hace mal tiempo_es-es.mp3" 
  },
  {
    id: "392",
    pos: "m.",
    word: "animal",
    definition: "definition",
    translation: "动物",
    voiceUrl: "audio_files\\392_m._animal_es-es.mp3" 
  },
  {
    id: "393",
    pos: "f.",
    word: "planta",
    definition: "definition",
    translation: "植物",
    voiceUrl: "audio_files\\393_f._planta_es-es.mp3" 
  },
  {
    id: "394",
    pos: "f.",
    word: "flor",
    definition: "definition",
    translation: "花",
    voiceUrl: "audio_files\\394_f._flor_es-es.mp3" 
  },
  {
    id: "395",
    pos: "m.",
    word: "árbol",
    definition: "definition",
    translation: "树",
    voiceUrl: "audio_files\\395_m._árbol_es-es.mp3" 
  },
]);



//DELE A1
await db.insert(schema.wordInBook).values([
  {
    wb_id: "3",
    word_id: "1",
    word_index: 1,
  },
  {
    wb_id: "3",
    word_id: "2",
    word_index: 2,
  },
  {
    wb_id: "3",
    word_id: "3",
    word_index: 3,
  },
  {
    wb_id: "3",
    word_id: "4",
    word_index: 4,
  },
  {
    wb_id: "3",
    word_id: "5",
    word_index: 5,
  },
  {
    wb_id: "3",
    word_id: "6",
    word_index: 6,
  },
  {
    wb_id: "3",
    word_id: "7",
    word_index: 7,
  },
  {
    wb_id: "3",
    word_id: "8",
    word_index: 8,
  },
  {
    wb_id: "3",
    word_id: "9",
    word_index: 9,
  },
  {
    wb_id: "3",
    word_id: "10",
    word_index: 10,
  },
  {
    wb_id: "3",
    word_id: "11",
    word_index: 11,
  },
  {
    wb_id: "3",
    word_id: "12",
    word_index: 12,
  },
  {
    wb_id: "3",
    word_id: "13",
    word_index: 13,
  },
  {
    wb_id: "3",
    word_id: "14",
    word_index: 14,
  },
  {
    wb_id: "3",
    word_id: "15",
    word_index: 15,
  },
  {
    wb_id: "3",
    word_id: "16",
    word_index: 16,
  },
  {
    wb_id: "3",
    word_id: "17",
    word_index: 17,
  },
  {
    wb_id: "3",
    word_id: "18",
    word_index: 18,
  },
  {
    wb_id: "3",
    word_id: "19",
    word_index: 19,
  },
  {
    wb_id: "3",
    word_id: "20",
    word_index: 20,
  },
  {
    wb_id: "3",
    word_id: "21",
    word_index: 21,
  },
  {
    wb_id: "3",
    word_id: "22",
    word_index: 22,
  },
  {
    wb_id: "3",
    word_id: "23",
    word_index: 23,
  },
  {
    wb_id: "3",
    word_id: "24",
    word_index: 24,
  },
  {
    wb_id: "3",
    word_id: "25",
    word_index: 25,
  },
  {
    wb_id: "3",
    word_id: "26",
    word_index: 26,
  },
  {
    wb_id: "3",
    word_id: "27",
    word_index: 27,
  },
  {
    wb_id: "3",
    word_id: "28",
    word_index: 28,
  },
  {
    wb_id: "3",
    word_id: "29",
    word_index: 29,
  },
  {
    wb_id: "3",
    word_id: "30",
    word_index: 30,
  },
  {
    wb_id: "3",
    word_id: "31",
    word_index: 31,
  },
  {
    wb_id: "3",
    word_id: "32",
    word_index: 32,
  },
  {
    wb_id: "3",
    word_id: "33",
    word_index: 33,
  },
  {
    wb_id: "3",
    word_id: "34",
    word_index: 34,
  },
  {
    wb_id: "3",
    word_id: "35",
    word_index: 35,
  },
  {
    wb_id: "3",
    word_id: "36",
    word_index: 36,
  },
  {
    wb_id: "3",
    word_id: "37",
    word_index: 37,
  },
  {
    wb_id: "3",
    word_id: "38",
    word_index: 38,
  },
  {
    wb_id: "3",
    word_id: "39",
    word_index: 39,
  },
  {
    wb_id: "3",
    word_id: "40",
    word_index: 40,
  },
  {
    wb_id: "3",
    word_id: "41",
    word_index: 41,
  },
  {
    wb_id: "3",
    word_id: "42",
    word_index: 42,
  },
  {
    wb_id: "3",
    word_id: "43",
    word_index: 43,
  },
  {
    wb_id: "3",
    word_id: "44",
    word_index: 44,
  },
  {
    wb_id: "3",
    word_id: "45",
    word_index: 45,
  },
  {
    wb_id: "3",
    word_id: "46",
    word_index: 46,
  },
  {
    wb_id: "3",
    word_id: "47",
    word_index: 47,
  },
  {
    wb_id: "3",
    word_id: "48",
    word_index: 48,
  },
  {
    wb_id: "3",
    word_id: "49",
    word_index: 49,
  },
  {
    wb_id: "3",
    word_id: "50",
    word_index: 50,
  },
  {
    wb_id: "3",
    word_id: "51",
    word_index: 51,
  },
  {
    wb_id: "3",
    word_id: "52",
    word_index: 52,
  },
  {
    wb_id: "3",
    word_id: "53",
    word_index: 53,
  },
  {
    wb_id: "3",
    word_id: "54",
    word_index: 54,
  },
  {
    wb_id: "3",
    word_id: "55",
    word_index: 55,
  },
  {
    wb_id: "3",
    word_id: "56",
    word_index: 56,
  },
  {
    wb_id: "3",
    word_id: "57",
    word_index: 57,
  },
  {
    wb_id: "3",
    word_id: "58",
    word_index: 58,
  },
  {
    wb_id: "3",
    word_id: "59",
    word_index: 59,
  },
  {
    wb_id: "3",
    word_id: "60",
    word_index: 60,
  },
  {
    wb_id: "3",
    word_id: "61",
    word_index: 61,
  },
  {
    wb_id: "3",
    word_id: "62",
    word_index: 62,
  },
  {
    wb_id: "3",
    word_id: "63",
    word_index: 63,
  },
  {
    wb_id: "3",
    word_id: "64",
    word_index: 64,
  },
  {
    wb_id: "3",
    word_id: "65",
    word_index: 65,
  },
  {
    wb_id: "3",
    word_id: "66",
    word_index: 66,
  },
  {
    wb_id: "3",
    word_id: "67",
    word_index: 67,
  },
  {
    wb_id: "3",
    word_id: "68",
    word_index: 68,
  },
  {
    wb_id: "3",
    word_id: "69",
    word_index: 69,
  },
  {
    wb_id: "3",
    word_id: "70",
    word_index: 70,
  },
  {
    wb_id: "3",
    word_id: "71",
    word_index: 71,
  },
  {
    wb_id: "3",
    word_id: "72",
    word_index: 72,
  },
  {
    wb_id: "3",
    word_id: "73",
    word_index: 73,
  },
  {
    wb_id: "3",
    word_id: "74",
    word_index: 74,
  },
  {
    wb_id: "3",
    word_id: "75",
    word_index: 75,
  },
  {
    wb_id: "3",
    word_id: "76",
    word_index: 76,
  },
  {
    wb_id: "3",
    word_id: "77",
    word_index: 77,
  },
  {
    wb_id: "3",
    word_id: "78",
    word_index: 78,
  },
  {
    wb_id: "3",
    word_id: "79",
    word_index: 79,
  },
  {
    wb_id: "3",
    word_id: "80",
    word_index: 80,
  },
  {
    wb_id: "3",
    word_id: "81",
    word_index: 81,
  },
  {
    wb_id: "3",
    word_id: "82",
    word_index: 82,
  },
  {
    wb_id: "3",
    word_id: "83",
    word_index: 83,
  },
  {
    wb_id: "3",
    word_id: "84",
    word_index: 84,
  },
  {
    wb_id: "3",
    word_id: "85",
    word_index: 85,
  },
  {
    wb_id: "3",
    word_id: "86",
    word_index: 86,
  },
  {
    wb_id: "3",
    word_id: "87",
    word_index: 87,
  },
  {
    wb_id: "3",
    word_id: "88",
    word_index: 88,
  },
  {
    wb_id: "3",
    word_id: "89",
    word_index: 89,
  },
  {
    wb_id: "3",
    word_id: "90",
    word_index: 90,
  },
  {
    wb_id: "3",
    word_id: "91",
    word_index: 91,
  },
  {
    wb_id: "3",
    word_id: "92",
    word_index: 92,
  },
  {
    wb_id: "3",
    word_id: "93",
    word_index: 93,
  },
  {
    wb_id: "3",
    word_id: "94",
    word_index: 94,
  },
  {
    wb_id: "3",
    word_id: "95",
    word_index: 95,
  },
  {
    wb_id: "3",
    word_id: "96",
    word_index: 96,
  },
  {
    wb_id: "3",
    word_id: "97",
    word_index: 97,
  },
  {
    wb_id: "3",
    word_id: "98",
    word_index: 98,
  },
  {
    wb_id: "3",
    word_id: "99",
    word_index: 99,
  },
  {
    wb_id: "3",
    word_id: "100",
    word_index: 100,
  },
  {
    wb_id: "3",
    word_id: "101",
    word_index: 101,
  },
  {
    wb_id: "3",
    word_id: "102",
    word_index: 102,
  },
  {
    wb_id: "3",
    word_id: "103",
    word_index: 103,
  },
  {
    wb_id: "3",
    word_id: "104",
    word_index: 104,
  },
  {
    wb_id: "3",
    word_id: "105",
    word_index: 105,
  },
  {
    wb_id: "3",
    word_id: "106",
    word_index: 106,
  },
  {
    wb_id: "3",
    word_id: "107",
    word_index: 107,
  },
  {
    wb_id: "3",
    word_id: "108",
    word_index: 108,
  },
  {
    wb_id: "3",
    word_id: "109",
    word_index: 109,
  },
  {
    wb_id: "3",
    word_id: "110",
    word_index: 110,
  },
  {
    wb_id: "3",
    word_id: "111",
    word_index: 111,
  },
  {
    wb_id: "3",
    word_id: "112",
    word_index: 112,
  },
  {
    wb_id: "3",
    word_id: "113",
    word_index: 113,
  },
  {
    wb_id: "3",
    word_id: "114",
    word_index: 114,
  },
  {
    wb_id: "3",
    word_id: "115",
    word_index: 115,
  },
  {
    wb_id: "3",
    word_id: "116",
    word_index: 116,
  },
  {
    wb_id: "3",
    word_id: "117",
    word_index: 117,
  },
  {
    wb_id: "3",
    word_id: "118",
    word_index: 118,
  },
  {
    wb_id: "3",
    word_id: "119",
    word_index: 119,
  },
  {
    wb_id: "3",
    word_id: "120",
    word_index: 120,
  },
  {
    wb_id: "3",
    word_id: "121",
    word_index: 121,
  },
  {
    wb_id: "3",
    word_id: "122",
    word_index: 122,
  },
  {
    wb_id: "3",
    word_id: "123",
    word_index: 123,
  },
  {
    wb_id: "3",
    word_id: "124",
    word_index: 124,
  },
  {
    wb_id: "3",
    word_id: "125",
    word_index: 125,
  },
  {
    wb_id: "3",
    word_id: "126",
    word_index: 126,
  },
  {
    wb_id: "3",
    word_id: "127",
    word_index: 127,
  },
  {
    wb_id: "3",
    word_id: "128",
    word_index: 128,
  },
  {
    wb_id: "3",
    word_id: "129",
    word_index: 129,
  },
  {
    wb_id: "3",
    word_id: "130",
    word_index: 130,
  },
  {
    wb_id: "3",
    word_id: "131",
    word_index: 131,
  },
  {
    wb_id: "3",
    word_id: "132",
    word_index: 132,
  },
  {
    wb_id: "3",
    word_id: "133",
    word_index: 133,
  },
  {
    wb_id: "3",
    word_id: "134",
    word_index: 134,
  },
  {
    wb_id: "3",
    word_id: "135",
    word_index: 135,
  },
  {
    wb_id: "3",
    word_id: "136",
    word_index: 136,
  },
  {
    wb_id: "3",
    word_id: "137",
    word_index: 137,
  },
  {
    wb_id: "3",
    word_id: "138",
    word_index: 138,
  },
  {
    wb_id: "3",
    word_id: "139",
    word_index: 139,
  },
  {
    wb_id: "3",
    word_id: "140",
    word_index: 140,
  },
  {
    wb_id: "3",
    word_id: "141",
    word_index: 141,
  },
  {
    wb_id: "3",
    word_id: "142",
    word_index: 142,
  },
  {
    wb_id: "3",
    word_id: "143",
    word_index: 143,
  },
  {
    wb_id: "3",
    word_id: "144",
    word_index: 144,
  },
  {
    wb_id: "3",
    word_id: "145",
    word_index: 145,
  },
  {
    wb_id: "3",
    word_id: "146",
    word_index: 146,
  },
  {
    wb_id: "3",
    word_id: "147",
    word_index: 147,
  },
  {
    wb_id: "3",
    word_id: "148",
    word_index: 148,
  },
  {
    wb_id: "3",
    word_id: "149",
    word_index: 149,
  },
  {
    wb_id: "3",
    word_id: "150",
    word_index: 150,
  },
  {
    wb_id: "3",
    word_id: "151",
    word_index: 151,
  },
  {
    wb_id: "3",
    word_id: "152",
    word_index: 152,
  },
  {
    wb_id: "3",
    word_id: "153",
    word_index: 153,
  },
  {
    wb_id: "3",
    word_id: "154",
    word_index: 154,
  },
  {
    wb_id: "3",
    word_id: "155",
    word_index: 155,
  },
  {
    wb_id: "3",
    word_id: "156",
    word_index: 156,
  },
  {
    wb_id: "3",
    word_id: "157",
    word_index: 157,
  },
  {
    wb_id: "3",
    word_id: "158",
    word_index: 158,
  },
  {
    wb_id: "3",
    word_id: "159",
    word_index: 159,
  },
  {
    wb_id: "3",
    word_id: "160",
    word_index: 160,
  },
  {
    wb_id: "3",
    word_id: "161",
    word_index: 161,
  },
  {
    wb_id: "3",
    word_id: "162",
    word_index: 162,
  },
  {
    wb_id: "3",
    word_id: "163",
    word_index: 163,
  },
  {
    wb_id: "3",
    word_id: "164",
    word_index: 164,
  },
  {
    wb_id: "3",
    word_id: "165",
    word_index: 165,
  },
  {
    wb_id: "3",
    word_id: "166",
    word_index: 166,
  },
  {
    wb_id: "3",
    word_id: "167",
    word_index: 167,
  },
  {
    wb_id: "3",
    word_id: "168",
    word_index: 168,
  },
  {
    wb_id: "3",
    word_id: "169",
    word_index: 169,
  },
  {
    wb_id: "3",
    word_id: "170",
    word_index: 170,
  },
  {
    wb_id: "3",
    word_id: "171",
    word_index: 171,
  },
  {
    wb_id: "3",
    word_id: "172",
    word_index: 172,
  },
  {
    wb_id: "3",
    word_id: "173",
    word_index: 173,
  },
  {
    wb_id: "3",
    word_id: "174",
    word_index: 174,
  },
  {
    wb_id: "3",
    word_id: "175",
    word_index: 175,
  },
  {
    wb_id: "3",
    word_id: "176",
    word_index: 176,
  },
  {
    wb_id: "3",
    word_id: "177",
    word_index: 177,
  },
  {
    wb_id: "3",
    word_id: "178",
    word_index: 178,
  },
  {
    wb_id: "3",
    word_id: "179",
    word_index: 179,
  },
  {
    wb_id: "3",
    word_id: "180",
    word_index: 180,
  },
  {
    wb_id: "3",
    word_id: "181",
    word_index: 181,
  },
  {
    wb_id: "3",
    word_id: "182",
    word_index: 182,
  },
  {
    wb_id: "3",
    word_id: "183",
    word_index: 183,
  },
  {
    wb_id: "3",
    word_id: "184",
    word_index: 184,
  },
  {
    wb_id: "3",
    word_id: "185",
    word_index: 185,
  },
  {
    wb_id: "3",
    word_id: "186",
    word_index: 186,
  },
  {
    wb_id: "3",
    word_id: "187",
    word_index: 187,
  },
  {
    wb_id: "3",
    word_id: "188",
    word_index: 188,
  },
  {
    wb_id: "3",
    word_id: "189",
    word_index: 189,
  },
  {
    wb_id: "3",
    word_id: "190",
    word_index: 190,
  },
  {
    wb_id: "3",
    word_id: "191",
    word_index: 191,
  },
  {
    wb_id: "3",
    word_id: "192",
    word_index: 192,
  },
  {
    wb_id: "3",
    word_id: "193",
    word_index: 193,
  },
  {
    wb_id: "3",
    word_id: "194",
    word_index: 194,
  },
  {
    wb_id: "3",
    word_id: "195",
    word_index: 195,
  },
  {
    wb_id: "3",
    word_id: "196",
    word_index: 196,
  },
  {
    wb_id: "3",
    word_id: "197",
    word_index: 197,
  },
  {
    wb_id: "3",
    word_id: "198",
    word_index: 198,
  },
  {
    wb_id: "3",
    word_id: "199",
    word_index: 199,
  },
  {
    wb_id: "3",
    word_id: "200",
    word_index: 200,
  },
  {
    wb_id: "3",
    word_id: "201",
    word_index: 201,
  },
  {
    wb_id: "3",
    word_id: "202",
    word_index: 202,
  },
  {
    wb_id: "3",
    word_id: "203",
    word_index: 203,
  },
  {
    wb_id: "3",
    word_id: "204",
    word_index: 204,
  },
  {
    wb_id: "3",
    word_id: "205",
    word_index: 205,
  },
  {
    wb_id: "3",
    word_id: "206",
    word_index: 206,
  },
  {
    wb_id: "3",
    word_id: "207",
    word_index: 207,
  },
  {
    wb_id: "3",
    word_id: "208",
    word_index: 208,
  },
  {
    wb_id: "3",
    word_id: "209",
    word_index: 209,
  },
  {
    wb_id: "3",
    word_id: "210",
    word_index: 210,
  },
  {
    wb_id: "3",
    word_id: "211",
    word_index: 211,
  },
  {
    wb_id: "3",
    word_id: "212",
    word_index: 212,
  },
  {
    wb_id: "3",
    word_id: "213",
    word_index: 213,
  },
  {
    wb_id: "3",
    word_id: "214",
    word_index: 214,
  },
  {
    wb_id: "3",
    word_id: "215",
    word_index: 215,
  },
  {
    wb_id: "3",
    word_id: "216",
    word_index: 216,
  },
  {
    wb_id: "3",
    word_id: "217",
    word_index: 217,
  },
  {
    wb_id: "3",
    word_id: "218",
    word_index: 218,
  },
  {
    wb_id: "3",
    word_id: "219",
    word_index: 219,
  },
  {
    wb_id: "3",
    word_id: "220",
    word_index: 220,
  },
  {
    wb_id: "3",
    word_id: "221",
    word_index: 221,
  },
  {
    wb_id: "3",
    word_id: "222",
    word_index: 222,
  },
  {
    wb_id: "3",
    word_id: "223",
    word_index: 223,
  },
  {
    wb_id: "3",
    word_id: "224",
    word_index: 224,
  },
  {
    wb_id: "3",
    word_id: "225",
    word_index: 225,
  },
  {
    wb_id: "3",
    word_id: "226",
    word_index: 226,
  },
  {
    wb_id: "3",
    word_id: "227",
    word_index: 227,
  },
  {
    wb_id: "3",
    word_id: "228",
    word_index: 228,
  },
  {
    wb_id: "3",
    word_id: "229",
    word_index: 229,
  },
  {
    wb_id: "3",
    word_id: "230",
    word_index: 230,
  },
  {
    wb_id: "3",
    word_id: "231",
    word_index: 231,
  },
  {
    wb_id: "3",
    word_id: "232",
    word_index: 232,
  },
  {
    wb_id: "3",
    word_id: "233",
    word_index: 233,
  },
  {
    wb_id: "3",
    word_id: "234",
    word_index: 234,
  },
  {
    wb_id: "3",
    word_id: "235",
    word_index: 235,
  },
  {
    wb_id: "3",
    word_id: "236",
    word_index: 236,
  },
  {
    wb_id: "3",
    word_id: "237",
    word_index: 237,
  },
  {
    wb_id: "3",
    word_id: "238",
    word_index: 238,
  },
  {
    wb_id: "3",
    word_id: "239",
    word_index: 239,
  },
  {
    wb_id: "3",
    word_id: "240",
    word_index: 240,
  },
  {
    wb_id: "3",
    word_id: "241",
    word_index: 241,
  },
  {
    wb_id: "3",
    word_id: "242",
    word_index: 242,
  },
  {
    wb_id: "3",
    word_id: "243",
    word_index: 243,
  },
  {
    wb_id: "3",
    word_id: "244",
    word_index: 244,
  },
  {
    wb_id: "3",
    word_id: "245",
    word_index: 245,
  },
  {
    wb_id: "3",
    word_id: "246",
    word_index: 246,
  },
  {
    wb_id: "3",
    word_id: "247",
    word_index: 247,
  },
  {
    wb_id: "3",
    word_id: "248",
    word_index: 248,
  },
  {
    wb_id: "3",
    word_id: "249",
    word_index: 249,
  },
  {
    wb_id: "3",
    word_id: "250",
    word_index: 250,
  },
  {
    wb_id: "3",
    word_id: "251",
    word_index: 251,
  },
  {
    wb_id: "3",
    word_id: "252",
    word_index: 252,
  },
  {
    wb_id: "3",
    word_id: "253",
    word_index: 253,
  },
  {
    wb_id: "3",
    word_id: "254",
    word_index: 254,
  },
  {
    wb_id: "3",
    word_id: "255",
    word_index: 255,
  },
  {
    wb_id: "3",
    word_id: "256",
    word_index: 256,
  },
  {
    wb_id: "3",
    word_id: "257",
    word_index: 257,
  },
  {
    wb_id: "3",
    word_id: "258",
    word_index: 258,
  },
  {
    wb_id: "3",
    word_id: "259",
    word_index: 259,
  },
  {
    wb_id: "3",
    word_id: "260",
    word_index: 260,
  },
  {
    wb_id: "3",
    word_id: "261",
    word_index: 261,
  },
  {
    wb_id: "3",
    word_id: "262",
    word_index: 262,
  },
  {
    wb_id: "3",
    word_id: "263",
    word_index: 263,
  },
  {
    wb_id: "3",
    word_id: "264",
    word_index: 264,
  },
  {
    wb_id: "3",
    word_id: "265",
    word_index: 265,
  },
  {
    wb_id: "3",
    word_id: "266",
    word_index: 266,
  },
  {
    wb_id: "3",
    word_id: "267",
    word_index: 267,
  },
  {
    wb_id: "3",
    word_id: "268",
    word_index: 268,
  },
  {
    wb_id: "3",
    word_id: "269",
    word_index: 269,
  },
  {
    wb_id: "3",
    word_id: "270",
    word_index: 270,
  },
  {
    wb_id: "3",
    word_id: "271",
    word_index: 271,
  },
  {
    wb_id: "3",
    word_id: "272",
    word_index: 272,
  },
  {
    wb_id: "3",
    word_id: "273",
    word_index: 273,
  },
  {
    wb_id: "3",
    word_id: "274",
    word_index: 274,
  },
  {
    wb_id: "3",
    word_id: "275",
    word_index: 275,
  },
  {
    wb_id: "3",
    word_id: "276",
    word_index: 276,
  },
  {
    wb_id: "3",
    word_id: "277",
    word_index: 277,
  },
  {
    wb_id: "3",
    word_id: "278",
    word_index: 278,
  },
  {
    wb_id: "3",
    word_id: "279",
    word_index: 279,
  },
  {
    wb_id: "3",
    word_id: "280",
    word_index: 280,
  },
  {
    wb_id: "3",
    word_id: "281",
    word_index: 281,
  },
  {
    wb_id: "3",
    word_id: "282",
    word_index: 282,
  },
  {
    wb_id: "3",
    word_id: "283",
    word_index: 283,
  },
  {
    wb_id: "3",
    word_id: "284",
    word_index: 284,
  },
  {
    wb_id: "3",
    word_id: "285",
    word_index: 285,
  },
  {
    wb_id: "3",
    word_id: "286",
    word_index: 286,
  },
  {
    wb_id: "3",
    word_id: "287",
    word_index: 287,
  },
  {
    wb_id: "3",
    word_id: "288",
    word_index: 288,
  },
  {
    wb_id: "3",
    word_id: "289",
    word_index: 289,
  },
  {
    wb_id: "3",
    word_id: "290",
    word_index: 290,
  },
  {
    wb_id: "3",
    word_id: "291",
    word_index: 291,
  },
  {
    wb_id: "3",
    word_id: "292",
    word_index: 292,
  },
  {
    wb_id: "3",
    word_id: "293",
    word_index: 293,
  },
  {
    wb_id: "3",
    word_id: "294",
    word_index: 294,
  },
  {
    wb_id: "3",
    word_id: "295",
    word_index: 295,
  },
  {
    wb_id: "3",
    word_id: "296",
    word_index: 296,
  },
  {
    wb_id: "3",
    word_id: "297",
    word_index: 297,
  },
  {
    wb_id: "3",
    word_id: "298",
    word_index: 298,
  },
  {
    wb_id: "3",
    word_id: "299",
    word_index: 299,
  },
  {
    wb_id: "3",
    word_id: "300",
    word_index: 300,
  },
  {
    wb_id: "3",
    word_id: "301",
    word_index: 301,
  },
  {
    wb_id: "3",
    word_id: "302",
    word_index: 302,
  },
  {
    wb_id: "3",
    word_id: "303",
    word_index: 303,
  },
  {
    wb_id: "3",
    word_id: "304",
    word_index: 304,
  },
  {
    wb_id: "3",
    word_id: "305",
    word_index: 305,
  },
  {
    wb_id: "3",
    word_id: "306",
    word_index: 306,
  },
  {
    wb_id: "3",
    word_id: "307",
    word_index: 307,
  },
  {
    wb_id: "3",
    word_id: "308",
    word_index: 308,
  },
  {
    wb_id: "3",
    word_id: "309",
    word_index: 309,
  },
  {
    wb_id: "3",
    word_id: "310",
    word_index: 310,
  },
  {
    wb_id: "3",
    word_id: "311",
    word_index: 311,
  },
  {
    wb_id: "3",
    word_id: "312",
    word_index: 312,
  },
  {
    wb_id: "3",
    word_id: "313",
    word_index: 313,
  },
  {
    wb_id: "3",
    word_id: "314",
    word_index: 314,
  },
  {
    wb_id: "3",
    word_id: "315",
    word_index: 315,
  },
  {
    wb_id: "3",
    word_id: "316",
    word_index: 316,
  },
  {
    wb_id: "3",
    word_id: "317",
    word_index: 317,
  },
  {
    wb_id: "3",
    word_id: "318",
    word_index: 318,
  },
  {
    wb_id: "3",
    word_id: "319",
    word_index: 319,
  },
  {
    wb_id: "3",
    word_id: "320",
    word_index: 320,
  },
  {
    wb_id: "3",
    word_id: "321",
    word_index: 321,
  },
  {
    wb_id: "3",
    word_id: "322",
    word_index: 322,
  },
  {
    wb_id: "3",
    word_id: "323",
    word_index: 323,
  },
  {
    wb_id: "3",
    word_id: "324",
    word_index: 324,
  },
  {
    wb_id: "3",
    word_id: "325",
    word_index: 325,
  },
  {
    wb_id: "3",
    word_id: "326",
    word_index: 326,
  },
  {
    wb_id: "3",
    word_id: "327",
    word_index: 327,
  },
  {
    wb_id: "3",
    word_id: "328",
    word_index: 328,
  },
  {
    wb_id: "3",
    word_id: "329",
    word_index: 329,
  },
  {
    wb_id: "3",
    word_id: "330",
    word_index: 330,
  },
  {
    wb_id: "3",
    word_id: "331",
    word_index: 331,
  },
  {
    wb_id: "3",
    word_id: "332",
    word_index: 332,
  },
  {
    wb_id: "3",
    word_id: "333",
    word_index: 333,
  },
  {
    wb_id: "3",
    word_id: "334",
    word_index: 334,
  },
  {
    wb_id: "3",
    word_id: "335",
    word_index: 335,
  },
  {
    wb_id: "3",
    word_id: "336",
    word_index: 336,
  },
  {
    wb_id: "3",
    word_id: "337",
    word_index: 337,
  },
  {
    wb_id: "3",
    word_id: "338",
    word_index: 338,
  },
  {
    wb_id: "3",
    word_id: "339",
    word_index: 339,
  },
  {
    wb_id: "3",
    word_id: "340",
    word_index: 340,
  },
  {
    wb_id: "3",
    word_id: "341",
    word_index: 341,
  },
  {
    wb_id: "3",
    word_id: "342",
    word_index: 342,
  },
  {
    wb_id: "3",
    word_id: "343",
    word_index: 343,
  },
  {
    wb_id: "3",
    word_id: "344",
    word_index: 344,
  },
  {
    wb_id: "3",
    word_id: "345",
    word_index: 345,
  },
  {
    wb_id: "3",
    word_id: "346",
    word_index: 346,
  },
  {
    wb_id: "3",
    word_id: "347",
    word_index: 347,
  },
  {
    wb_id: "3",
    word_id: "348",
    word_index: 348,
  },
  {
    wb_id: "3",
    word_id: "349",
    word_index: 349,
  },
  {
    wb_id: "3",
    word_id: "350",
    word_index: 350,
  },
  {
    wb_id: "3",
    word_id: "351",
    word_index: 351,
  },
  {
    wb_id: "3",
    word_id: "352",
    word_index: 352,
  },
  {
    wb_id: "3",
    word_id: "353",
    word_index: 353,
  },
  {
    wb_id: "3",
    word_id: "354",
    word_index: 354,
  },
  {
    wb_id: "3",
    word_id: "355",
    word_index: 355,
  },
  {
    wb_id: "3",
    word_id: "356",
    word_index: 356,
  },
  {
    wb_id: "3",
    word_id: "357",
    word_index: 357,
  },
  {
    wb_id: "3",
    word_id: "358",
    word_index: 358,
  },
  {
    wb_id: "3",
    word_id: "359",
    word_index: 359,
  },
  {
    wb_id: "3",
    word_id: "360",
    word_index: 360,
  },
  {
    wb_id: "3",
    word_id: "361",
    word_index: 361,
  },
  {
    wb_id: "3",
    word_id: "362",
    word_index: 362,
  },
  {
    wb_id: "3",
    word_id: "363",
    word_index: 363,
  },
  {
    wb_id: "3",
    word_id: "364",
    word_index: 364,
  },
  {
    wb_id: "3",
    word_id: "365",
    word_index: 365,
  },
  {
    wb_id: "3",
    word_id: "366",
    word_index: 366,
  },
  {
    wb_id: "3",
    word_id: "367",
    word_index: 367,
  },
  {
    wb_id: "3",
    word_id: "368",
    word_index: 368,
  },
  {
    wb_id: "3",
    word_id: "369",
    word_index: 369,
  },
  {
    wb_id: "3",
    word_id: "370",
    word_index: 370,
  },
  {
    wb_id: "3",
    word_id: "371",
    word_index: 371,
  },
  {
    wb_id: "3",
    word_id: "372",
    word_index: 372,
  },
  {
    wb_id: "3",
    word_id: "373",
    word_index: 373,
  },
  {
    wb_id: "3",
    word_id: "374",
    word_index: 374,
  },
  {
    wb_id: "3",
    word_id: "375",
    word_index: 375,
  },
  {
    wb_id: "3",
    word_id: "376",
    word_index: 376,
  },
  {
    wb_id: "3",
    word_id: "377",
    word_index: 377,
  },
  {
    wb_id: "3",
    word_id: "378",
    word_index: 378,
  },
  {
    wb_id: "3",
    word_id: "379",
    word_index: 379,
  },
  {
    wb_id: "3",
    word_id: "380",
    word_index: 380,
  },
  {
    wb_id: "3",
    word_id: "381",
    word_index: 381,
  },
  {
    wb_id: "3",
    word_id: "382",
    word_index: 382,
  },
  {
    wb_id: "3",
    word_id: "383",
    word_index: 383,
  },
  {
    wb_id: "3",
    word_id: "384",
    word_index: 384,
  },
  {
    wb_id: "3",
    word_id: "385",
    word_index: 385,
  },
  {
    wb_id: "3",
    word_id: "386",
    word_index: 386,
  },
  {
    wb_id: "3",
    word_id: "387",
    word_index: 387,
  },
  {
    wb_id: "3",
    word_id: "388",
    word_index: 388,
  },
  {
    wb_id: "3",
    word_id: "389",
    word_index: 389,
  },
  {
    wb_id: "3",
    word_id: "390",
    word_index: 390,
  },
  {
    wb_id: "3",
    word_id: "391",
    word_index: 391,
  },
  {
    wb_id: "3",
    word_id: "392",
    word_index: 392,
  },
  {
    wb_id: "3",
    word_id: "393",
    word_index: 393,
  },
  {
    wb_id: "3",
    word_id: "394",
    word_index: 394,
  },
  {
    wb_id: "3",
    word_id: "395",
    word_index: 395,
  },
]);

console.log("Seeding complete.");
