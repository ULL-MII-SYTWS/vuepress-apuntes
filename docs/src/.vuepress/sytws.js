// Crguezl: My Jekyll _config.yml file for SYTWS web site
const TemasPublicados = require('./temas-publicados.js')
const sytwsId = "2425110680"
const course = "2425"
const classroomId = "176799104" // "144119227"
const campus = "https://campusdoctoradoyposgrado2425.ull.es"
const teacher = "https://www.ull.es/apps/guias/guias/view_teacher_niu/1364/crguezl/"
const aet = "https://campusdoctoradoyposgrado2425.ull.es/course/view.php?id=2425110055"
const tfg = { text: 'TFG', link: "https://campusingenieriaytecnologia2425.ull.es/course/view.php?id=2425090185"}
const dmsi = { text: "DMSI", link: "https://campusingenieriaytecnologia2425.ull.es/course/view.php?id=2425090032"}
const spreadsheets =  {text: 'Spreadsheets', link: 'https://docs.google.com/spreadsheets/u/0/?tgif=d&q=SYTWS'}
const commitsPerLab = require('./commits-per-lab.json');

const navigationBar = [
  {
    text: 'Clases',
    link: '/clases/index.html',
  },
  {
    text: 'Labs',
    link: '/practicas/index.html'
  },
  /*
  {
    text: 'Temas',
    items: TemasPublicados,
  },
  */
  {
    text: 'Teams',
    link: '/teams/index.html'
  },
  {
    text: 'Context',
    items: [
      {
        text: 'Recursos',
        items: [
            { text: "ULL", link: '/recursos/index.html/#recursos-ull'},
            { text: "GitHub", link: '/recursos/index.html/#recursos-github'},
          ]
      },      
      {
        text: 'Horarios',
        items: [  
          { text: 'Google Cal, Cal Acad y Exámenes', link: '/horarios/index.html'},
          { text: 'Horarios del Master', link: 'https://www.ull.es/masteres/ingenieria-informatica/informacion-academica/horarios-y-calendario-examenes/'},
        ],
      },
      {
        text: 'Referencias',
        link: '/referencias/index.html'
      },
    ]
  },
  {
    text: 'GitHub',
    items: [
      {
        text: "ULL-MII-SYTWS-"+course,
        items: [
          {text: 'Organization', link: 'https://github.com/ULL-MII-SYTWS-'+course},
          {text: 'Teams', link: '/teams/'},
          {text: 'Projects', link: 'https://github.com/orgs/ULL-MII-SYTWS-'+course+'/projects'},
          {text: 'Classroom', link: 'https://classroom.github.com/classrooms/'+classroomId+'-ull-mii-sytws-'+course},
          {text: 'Template Org', link: 'https://github.com/ULL-MII-SYTWS'},

        ]    
      },
      {text: 'Apuntes Repo', 
        items: [
        { text: 'Deploy at GH', link: 'https://ull-mii-sytws.github.io'},
        //{ text: "Deploy at netlify", link: 'https://sytws.netlify.app/'},
        { text: 'Source', link: 'https://github.com/ULL-MII-SYTWS/vuepress-apuntes'},
        { text: 'Generated repo', link: 'https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io' }
        ]
      },
      {text: 'Teacher',
        items: [
          {text: 'ULL-MFP-TFM-Y-PCE-'+course, link: 'https://github.com/ULL-MFP-TFM-Y-PCE-'+course+'/private'},
          //{text: 'SYTWS Discussions', link: 'https://github.com/ULL-MII-SYTWS-'+course+'/SYTWS-'+course+'-discussions/discussions'},
          {text: 'Global Campus Teachers', link: 'https://github.com/GitHub-Global-Campus/Global-Campus-Teachers/discussions'},
        ]
      }
    ]
  },
  {
    text: 'Campus Virtual',
    items: [
      { text:'SYTWS en el Campus Virtual', link: 'https://campusdoctoradoyposgrado'+course+'.ull.es/course/view.php?id='+sytwsId },
      {text: 'Guía Docente',
       items: [
         { text: "Guía", link: 'https://www.ull.es/apps/guias/guias/view_guide_course/'+course+'/835941105/'},
         { text: "Casiano", link: teacher},
         //{text: 'Horario de Tutorías', link: 'https://www.ull.es/apps/guias/guias/view_guide_course/'+course+'/835941105/3/'},
       ]
      },
      { text: 'Campus',
        items: [
          { text: 'Participantes', link: "https://campusdoctoradoyposgrado"+course+".ull.es/user/index.php?id="+sytwsId },
          { text: 'Calificador', link: "https://campusdoctoradoyposgrado"+course+".ull.es/grade/report/user/index.php?id="+sytwsId },
          { text: 'Tareas', link: "https://campusdoctoradoyposgrado"+course+".ull.es/mod/assign/index.php?id="+sytwsId},
          { text: 'Foros', link: "https://campusdoctoradoyposgrado"+course+".ull.es/mod/forum/index.php?id="+sytwsId},
          { text: 'Banco de Preguntas', link: "https://campusdoctoradoyposgrado"+course+".ull.es/question/edit.php?courseid="+sytwsId },
        ]
      },
      { 
        text: 'ULL',
        items: [
          {text: 'Calendario Académico', link: 'https://www.ull.es/estudios-docencia/calendario-academico/'},
          {text: 'Portafirmas', link: 'https://sede.ull.es/ecivilis-signature-inbox-application/inbox.html'},
          {text: 'Editor cvn', link: 'https://cvn.fecyt.es/editor/'},
        ]
      },
      //tfg,
      { text: 'Campus de Masters', link: campus+"/"},
      { text: 'Campus de ESIT', link: "https://campusingenieriaytecnologia2425.ull.es/"},
      dmsi,
      //{ text: "AET", link: aet },
      { text: "SYTWS 2324", link: "https://ull-mii-sytws-2324.github.io/"}, 
      { text: "SYTWS 2122", link: "https://ull-mii-sytws-2122.github.io/"}, 
/*
      <li><a :href="$var.foros" target="_blank">Foros</a></li>
*/
    ]
  },
  {
    text: 'Google',
    items: [
      {text: 'Meet', link: 'https://meet.google.com/bhv-togn-ynm'},
      {text: 'Chat', link: 'https://mail.google.com/chat/u/1/#chat/welcome'},
      spreadsheets,
      //{text: 'Community', link: 'https://currents.google.com/u/1/communities/104629784252354892425' },
      {
        text: 'Vídeos', 
        items: [
          { text: 'Curso 22/23', link: 'https://www.youtube.com/playlist?list=PLuPGCp-dfrUQ1SMSQWaW-PDeoxJpk2uzh' },
          { text: 'Curso 21/22', link: 'https://youtube.com/playlist?list=PLuPGCp-dfrUQbbnbT_8qHK1WQYurYwBEY' },
          { text: 'Curso 20/21', link: 'https://www.youtube.com/playlist?list=PLuPGCp-dfrUTzN_o2beArY1QoFUTGH-yd'},
          { text: 'Curso 19/20', link: 'https://youtube.com/playlist?list=PLuPGCp-dfrUTByhC5b9vInei9OzdYSBs7' },
        ]
      }
    ]
  }
];

const SYTWSinfo = {
  commitsPerLab: commitsPerLab,

  networks: ['telegram', 'whatsapp', 'email', 'twitter', ],
  "locale": "en-US",
  "title": "SYTWS",
  "title_separator": "-",
  "name": "Sistemas y Tecnologías Web en el Servidor",
  "description": "Itinerario de Computación. 2º cuatrimestre",
  "url": null,
  "baseurl": "",
  "repository": "ULL-MII-SYTWS/ull-mii-sytws.github.io",
  "teaser": null,
  "logoLightBackground": "/images/escuela-politecnica-ingenieria-original.png",
  "logoDarkBackground": "/images/escuela-politecnica-ingenieria-positivo.png",
  "logo": "/images/escuela-politecnica-ingenieria-positivo.png",
  "author": {
    "name": " Casiano Rodríguez León",
    "avatar": "/images/bio-photo.jpg",
    "home": "https://crguezl.github.io",
    "bio": null,
    "location": "San Cristóbal de La Laguna",
    "email": null,
    "links": [
      {
        "label": "Email",
        "icon": "fas fa-fw fa-envelope-square"
      },
      {
        "label": "Website",
        "icon": "fas fa-fw fa-link",
        "url": "https://crguezl.github.io"
      },
      {
        "label": "Twitter",
        "icon": "fab fa-fw fa-twitter-square"
      },
      {
        "label": "Facebook",
        "icon": "fab fa-fw fa-facebook-square"
      },
      {
        "label": "GitHub",
        "icon": "fab fa-fw fa-github"
      },
      {
        "label": "Instagram",
        "icon": "fab fa-fw fa-instagram"
      }
    ]
  },
  nav: navigationBar,
  "encoding": "utf-8",
  "singular": {
    "practicas": "Práctica",
    "temas": "Tema",
    "clases": "Clase"
  },
  "lsi": false,
  "excerpt_separator": "\n\n",
  "incremental": false,
  "calendario_academico": "https://www.ull.es/estudios-docencia/calendario-academico/",
  "horarios_master": "https://www.ull.es/masteres/ingenieria-informatica/informacion-academica/horarios-y-calendario-examenes/",
  "horarios_tutorias": "https://www.ull.es/apps/guias/guias/view_guide/24127/",
  "cita_previa": "https://calendar.google.com/calendar/u/0/selfsched?sstoken=UUd1YlJSLURtcE5JfGRlZmF1bHR8ZmNiMWNmMTE4MjNjNzk1MWQwZGQyYTI4ZjZjYjZjY2E",
  "google_plus": "https://currents.google.com/u/1/communities/104629784252354892425",
  "organization": {
    "url": "https://github.com/ULL-MII-SYTWS-"+course,
    "name": "ULL-MII-SYTWS-"+course,
    "main": "https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io/tree/main/"
  },
  "apuntes_repo": "https://github.com/ULL-MII-SYTWS/ull-mii-sytws.github.io",
  "campus_virtual": campus+"/course/view.php?id="+sytwsId,
  "calificador": campus+"/grade/report/user/index.php?id="+sytwsId,
  "participantes": campus+"/user/index.php?id="+sytwsId,
  "tareas": campus+"/mod/assign/index.php?id="+sytwsId,
  "foros": campus+"/mod/forum/index.php?id="+sytwsId,
  "profesor": teacher,
  "teacher_profile_edit": "https://www.ull.es/apps/guias/teachers/view_profile/",
  "alu_github": campus+"/mod/assign/view.php?id=21205",
  "udv": "https://udv.ull.es/portal/",
  "profesor_github": "crguezl",
  "chat": "https://chat.google.com/u/1/room/AAAANx1edCg",
  "bull_puntoq": "https://www.ull.es/servicios/biblioteca/servicios/puntoq/",
  "bull_permanente": "https://puntoq.ull.es/permalink/f",
  "covid_ull": "https://campusvirtual.ull.es/doctoradoyposgrado/course/view.php?id=201913946",
  "turnitin": "https://docs.google.com/forms/d/e/1FAIpQLSfEyKnNYAXH5lH9eTh6de6qu5dP-lp33ul4QE8PrFLqeXT66A/viewform",
  "dsi": {
    "apuntes": "https://ull-mii-dsi-1819.github.io/dsi-1819/"
  },
  "sytws": {
    "url": "https://ull-mii-sytws-1920.github.io/"
  },
  "disqus": {
    "url": "https://procesadores-de-lenguajes.disqus.com/embed.js",
    "comments": true
  },
  "classroom": {
    "url": "https://classroom.github.com/classrooms/"+classroomId+"-ull-mii-sytws-"+course,
    "name": "ULL-MII-SYTWS-"+course
  },
};

module.exports = SYTWSinfo;

/*
    sidebar: {
      '/clases/': [
        {
          title: 'Clases',
          collapsable: false,
          children: [
            '',
            'introducción a SYTWS',
          ]
        }
      ],
      '/temas/': [
        {
          title: 'Temas',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
    } */