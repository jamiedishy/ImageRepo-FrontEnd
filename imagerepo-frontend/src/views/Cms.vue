<template>
  <div class="cms">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6" class="mt-5">
          <h1>CMS Tool</h1>
          <h2 class="my-3">Upload Images of Biscuit!</h2>
          <b-button
            to="/uploads"
            class="mb-3"
            pill
            variant="outline-primary"
            size="md"
            >View uploaded images</b-button
          >
        </b-col>
        <b-col cols="4">
          <b-img class="image mr-5" alt="Home image" src="cms2.png" />
        </b-col>
      </b-row>
      <hr class="my-4" />
      <b-row class="mt-2">
        <b-col lg="10" class="pb-2">
          <b-form-file
            v-model="file"
            @change="previewImage"
            ref="file-input"
            class="mb-2"
          ></b-form-file>
          <b-button @click="initializeVariables()">Clear selection</b-button>
        </b-col>
      </b-row>
      <b-row v-if="file != null" align-h="center">
        <b-col md="6" offset-md="0">
          <b-card
            border-variant="primary"
            title="Image upload"
            :img-src="imageData"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 30rem;"
            class="mb-2"
          >
            <b-card-text>
              <b-form-input
                v-model="name"
                placeholder="Enter image name"
              ></b-form-input>
              <b-form-input
                class="mt-3"
                v-model="price"
                placeholder="Enter image price"
              ></b-form-input>
              <b-form-tags
                class="mt-3"
                input-id="tags-basic"
                v-model="tagValue"
              ></b-form-tags>
            </b-card-text>
          </b-card>
          <b-button
            href="#"
            @click="uploadImage()"
            class="mt-3"
            variant="primary"
            >Upload</b-button
          >
        </b-col>
      </b-row>

      <b-modal hide-footer ref="my-modal" title="Image upload">
        <template v-if="this.error === false">
          <p class="my-4">Successfully uploaded!</p>
        </template>
        <template v-else>
          <p class="my-4">Error</p>
        </template>
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
      file: null,
      imageData: "",
      name: "",
      price: "",
      error: false,
      selectedFile: "",
      tagValue: []
    };
  },
  methods: {
    previewImage(event) {
      this.selectedFile = event.target.files[0];
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async uploadImage() {
      this.error = false;
      const formData = new FormData();
      formData.append(
        "productImage",
        this.selectedFile,
        this.selectedFile.name
      );
      formData.append("name", this.name);
      formData.append("price", this.price);
      try {
        await axios.post("http://localhost:3000/products", formData);
        this.$refs["my-modal"].show();
      } catch (err) {
        console.log(err);
        this.error = true;
        this.$refs["my-modal"].show();
      }
      this.initializeVariables();
    },
    initializeVariables() {
      this.imageData = "";
      this.file = null;
      this.selectedFile = "";
      this.name = "";
      this.price = "";
      // this.error = false;
      this.tagValue = [];
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
