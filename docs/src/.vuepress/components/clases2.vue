<template>
    <ol reversed> 
        <li v-for="page in classFiles" :key="page.key"> 
        <a :href="page.path" style="color: red">{{ page.title }}</a> 
        <ul>
          <li>{{ page.frontmatter.summary }}</li>
          <li v-if="page.frontmatter.video"><a :href="getUrl(page.frontmatter.video)" target="_blank">Vídeo</a></li>
          <li v-if="page.frontmatter.labs && page.frontmatter.labs.length">Related Labs:
            <span v-for="lab in getUrls(page.frontmatter.labs)">
               <a :href="lab.href">"{{ lab.text }}" </a>
            </span>
          </li>
          <li v-if="page.frontmatter.temas && page.frontmatter.temas.length">Related Themes:
            <span v-for="tema in page.frontmatter.temas">
               <a :href="tema.href">"{{ tema.text }}" </a>
            </span>
          </li>
        </ul>
        </li>
    </ol>
</template>

<script>
    import * as path from 'path';

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
            getUrls(list) {
                 return list.map(name => ({href: `/practicas/${name}`, text: name}));
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
            }
        }
    }
</script>
