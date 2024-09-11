<template>
    <div class="clases">
      <h1>{{ numberOfClasses}} clases y {{ numberOfWeeks }} semanas</h1>
 
      <div v-for="(page, index) in classFiles" :key="page.key">  
        <h3 v-if="(index >= 1) && (week(page) !== week(classFiles[index-1]))">{{ week(page)+1 }}ª  semana {{ getWeekType(page) }}</h3>
        <h3 v-else-if="(index == 0)">{{ week(page)+1 }}ª  semana {{  getWeekType(page)}}</h3>
        <ul>
            <li><a :href="page.path">{{ page.title }}</a>. Clase nº {{ numberOfClasses - index }}
            <span v-if="presentialWednesday(page)"> (Presential Wednesday)</span>
            <span v-else-if="(getDayOfTheWeek(page) === 3)"> (Async Wednesday)</span>
            </li>
            <ul>
                <li>{{ page.frontmatter.summary }}</li>
                <li v-if="page.frontmatter.video"><a :href="getUrl(page.frontmatter.video)" target="_blank">Vídeo</a></li>
            </ul>
        </ul>
      </div>
    </div>
</template>

<script>
    import * as path from 'path';
    const CourseStartDate = "2024-09-16"

    function weekOfTheYear(date) {
        var d = new Date(+date);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    }
    
    function getWeeksDiff(startDate, endDate) {
      const msInWeek = 1000 * 60 * 60 * 24 * 7;

      return Math.round(Math.abs(endDate - startDate) / msInWeek);
    }
    
    function dayOfTheWeek(date) {
        var d = new Date(+date);
        d.setHours(0, 0, 0);
        return d.getDay();
    }

    const weekType = ['C', 'A', 'B (Presencial)'];
    const firstLessonDate = new Date(CourseStartDate);
    const firstWeek = weekOfTheYear(firstLessonDate);

    export default { 
        data() {
            return {
                path: path,
                currentMonth: 0
            }
        },
        methods: {
            getBaseName(page) {
                return path.basename(page.path)
            },
            getDate(page) {
                let m = /(\d+.\d+.\d+)/.exec(page.relativePath);
                return m? m[1] : null
            },
            getUrl(idOrurl) {
                if (/https/.test(idOrurl)) return idOrurl;
                return "https://youtu.be/"+idOrurl;
            },
            week(page) {
                //console.log(firstWeek);
                let [year, month, day] = this.getDate(page).split(/[-]/);
                //console.log(year, month, day);
                
                let date = new Date(`${month}/${day}/${year}`);
                //console.log(date);
                const weekDiff = getWeeksDiff(firstLessonDate, date);
                //console.log(weekDiff);
                return weekDiff; //weekDiff+1;
                
            },
            getWeekType(page) {
                let w = this.week(page);
                console.log(w);
                // Bug! Christmas holidays are not taken into account
                return weekType[w == 15? 1 : w % 3];
            },
            getDayOfTheWeek(page) {
                //console.log(page);
                let [year, month, day] = this.getDate(page).split(/[-]/); 
                let date = new Date(`${month}/${day}/${year}`);
                return date.getDay();
            },
            isPresential(page) {
                return this.getWeekType(page) === weekType[2];
            },
            presentialWednesday(page) {
                return (this.getDayOfTheWeek(page) === 3) && (this.isPresential(page))
            }
        },
        computed: {
            classFiles() {      
                let compare = (pageA, pageB) => {
                    let a = this.getDate(pageA);
                    let b = this.getDate(pageB);

                    if (a < b) {
                        return 1;
                    }
                    if (a > b) {
                        return -1;
                    }
                    // a must be equal to b
                   return 0;
                }          
                let clases = this.$site.pages.filter(page => /clases.\d+/.test(page.relativePath));
                //console.log(this.getDate(clases[0]));
                return clases.sort( compare );
            },
            video() {
                url = this.page.frontmatter.video
                return url;
            },
            numberOfClasses() {
                return this.classFiles.length;
            },
            numberOfWeeks() {
                return this.week(this.classFiles[0]) - this.week(this.classFiles[this.classFiles.length - 1]) + 1;
            }

        }
    }
</script>
