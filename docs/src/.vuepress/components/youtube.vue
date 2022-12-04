<template>
  <div class="responsive-video-container">
    <iframe
      :src="src"
      frameborder="0"
      webkitAllowFullScreen
      mozallowfullscreen
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
    // https://www.youtube-nocookie.com/embed/{{ id }}
    export default { 
        props: [ "id" ],
        data() {
            return {
            }
        },
        computed: {
          src() {
            let id = this.id; // from the property
            //console.log(this.$page.frontmatter.video);
            if (!id) {
              id = (this.$page && this.$page.frontmatter && this.$page.frontmatter.video);
            }
            let m = /https:.*\.be\/(\w+)$/.exec(id);
            if (m && m[1]) id = m[1];

            //console.log(id);
            return "https://www.youtube-nocookie.com/embed/"+id
          }
        } 
    }
</script>

<style scoped>
  .responsive-video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  }
  .responsive-video-container iframe,
  .responsive-video-container object,
  .responsive-video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>