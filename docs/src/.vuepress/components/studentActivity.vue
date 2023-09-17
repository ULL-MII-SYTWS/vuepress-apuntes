<template>
  <div if lab>
    <ul>
      <li>Repo <a :href="repoUrl" target="_blank">{{ lab }}</a> for {{ name || student }}</li>
      <li><a :href="commits" target="_blank">Commits</a> of {{ name || student }} for  {{ lab }}  {{ getCommitsForLab }} </li>
      <li><a :href="graph" target="_blank">Commit Activity Graph</a> of {{ name || student }} for  {{ lab }} </li>
      <li><a :href="pulse" target="_blank">Pulse Activity</a> of {{ name || student }} for  {{ lab }} </li>
      <li><a :href="traffic" target="_blank">Traffic</a> of {{ name || student }} for  {{ lab }} </li>
      <li><a :href="codeFrequency" target="_blank">Code frequency</a> of {{ name || student }} for  {{ lab }} </li>
      <li><a :href="projects" target="_blank">Projects</a> of {{ name || student }} for  {{ lab }} </li>
    </ul>
  </div>
</template>


<script>

  // remove accents and special characters from the string
  // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  function removeAccents(str) {
    // NFD=Canonical Decomposition. http://www.unicode.org/charts//PDF/Unicode-4.0/U40-0300.pdf
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  export default {
    props: {
      lab: {
        type: String,
        required: true
      },
      student: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        //repoUrl: '
      }
    },
    methods: {

    },
    computed: {
      repoUrl() {
        let organization = this.$site.pages[0].global.organization.name
        //console.log(organization, this.lab, this.student)
        let url = 'https://github.com/'+organization+'/'+this.lab+'-'+removeAccents(this.student)
        //console.log(url)
        return url
      },
      commits() {
        return this.repoUrl+'/commits'
      },
      graph() {
        return this.repoUrl+'/graphs/commit-activity'
      },
      pulse() {
        return this.repoUrl+'/pulse'
      },
      traffic() {
        return this.repoUrl+'/graphs/traffic'
      },
      codeFrequency() {
        return this.repoUrl+'/graphs/code-frequency'
      },
      projects() {
        return this.repoUrl+'/projects'
      },
      getCommitsForLab() {
        let cplarray = this.$site.pages[0].global.commitsPerLab[this.lab];
        let cpl = cplarray?.find(x => x?.name?.match(this.student))?.total || 0
        //let cpl = pl.commitsPerLab[this.lab]?.find(x => x?.name?.match(this.student))?.total || 0
        return `(${JSON.stringify(cpl)})`
      }  
    }
  }
  
</script>

<style scoped>
</style>
