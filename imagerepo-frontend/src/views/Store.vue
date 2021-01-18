<template>
  <div class="cms">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6" class="mt-5">
          <h1>Gallery</h1>
          <h2 class="mt-3">Browse and purchase Biscuit's portraits!</h2>
        </b-col>
        <b-col cols="4">
          <b-img class="image mr-5" alt="Home image" src="logo-medium.png" />
        </b-col>
      </b-row>
      <hr class="my-4" />
      <b-row cols="2" class="mt-2 align-self-md-stretch">
        <!-- <b-col lg="10" class="pb-2"> -->
        <div v-for="(image, index) in this.data.products" :key="index">
          <!-- <img :src="imageBlobs[index]" alt="portrait" /> -->
          <b-card
            :title="image.name"
            :img-src="imageBlobs[index]"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-5 h-100"
          >
            <b-card-text>
              <p>Price: {{ image.price }}</p>
              <p>Portrait number {{ index }}</p>
            </b-card-text>

            <b-button href="#" variant="primary">Purchase</b-button>
          </b-card>
        </div>
        <!-- </b-col> -->
      </b-row>

      <b-modal hide-footer ref="my-modal" title="Image upload">
        <p class="my-4">Error</p>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Cms",
  components: {},
  data() {
    return {
      data: "",
      imageBlobs: []
    };
  },
  async created() {
    await this.getData();
    await this.getImages();
  },
  methods: {
    async getData() {
      try {
        const temp = await axios.get("http://localhost:3000/products/");
        console.log("temp", temp);
        this.data = temp.data;
      } catch (err) {
        console.log(err);
        this.$refs["my-modal"].show();
      }
    },
    async getImages() {
      this.data.products.forEach((el, index) => {
        this.getImagesAxios(el, index);
      });
    },

    async getImagesAxios(el, index) {
      let config = {
        method: "get",
        url: el.request.url,
        responseType: "blob"
      };
      try {
        let temp = await axios(config);
        console.log("temp", temp);
        let reader = new FileReader();
        reader.readAsDataURL(temp.data);
        reader.onload = () => {
          this.imageBlobs[index] = reader.result;
        };
      } catch (err) {
        console.log(err);
        this.$refs["my-modal"].show();
      }
    }

    //   console.log(self.src)

    // callAxiosImage(url, index) {
    //     var config = {
    //     method: "get",
    //     url: url,
    //     responseType: "blob"
    //   };

    //   axios(config).then(response => {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(response.data);
    //     reader.onload = () => {
    //       this.imageBlobs[index] = reader.result;
    //     };
    //   });
    // }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
