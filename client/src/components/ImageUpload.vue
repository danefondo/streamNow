<template>
  <div class="stream_input_container">
    <div class="stream_input_title image-caption">{{ caption }}</div>
    <div class="entryDetailsGroup auto-side-margins">
      <div class="mainImage" id="imageArea_">
        <div class="file-upload imageBlock" data-type="mainImage">
          <form
            v-show="!value"
            class="image-upload-wrap imageForm"
            action="/' + coreURL + '/sign-s3"
            method="POST"
            enctype="multipart/form-data"
          >
            <input
              ref="fileInput"
              class="file-upload-input"
              id="file-input"
              type="file"
              name="image"
              accept="image/jpg"
              @change="imageChange"
            />
            <div class="drag-text padding-60">
              <button class="file-upload-btn" type="button">Upload custom thumbnail</button>
              <h3>Or just drag and drop a file</h3>
            </div>
          </form>
          <div v-show="value" class="file-upload-content">
            <img :src="value && value.preview" class="file-upload-image" alt="your image" />
            <div class="image-title-wrap">
              <button @click="remove" class="remove-image" type="button">
                <span class="image-pre-title">Remove </span>
                <span class="image-title">{{ fileName || "image"}}</span>
                <span v-show="uploading" class="image-uploading-title">Uploading image...</span>
                <!--<span class="image-removing-title">Removing image...</span>-->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inputErrorContainer">
      <div class="inputErrorText"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  model: {
    props: "value",
    event: "change"
  },
  props: {
      value: {
          type: Object,
      },
      uploading: {
          type: Boolean,
          default: false,
      },
      caption: {
        type: String,
        default: "Upload custom thumbnail (optional)"
      }
  },
  data() {
    return {
      fileName: ""
    };
  },
  methods: {
    imageChange({ target }) {
      const file = target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.$emit("change", {
            preview: e.target.result,
            file
          });
          this.fileName = file.name;
        };
        reader.readAsDataURL(file);
        return;
      }
    },
    remove() {
      this.$emit("change", null);
      this.$refs.fileInput.value = null;
      this.fileName = "";
    }
  }
};
</script>

<style>
.image-caption {
  text-align: center;
}
.file-upload {
  background-color: #fbfbfb;
  box-sizing: border-box;
}
.file-upload-btn {
  margin: 0;
  font-size: 29px;
  background: transparent;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  outline: none;
  font-weight: 700;
  color: #130089;
  font-family: "Trebuchet MS", sans-serif;
  margin-bottom: 10px;
}
.file-upload-btn:hover {
  background: #120088bd;
  color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.file-upload-btn:active {
  border: 0;
  transition: all 0.2s ease;
}
.file-upload-content {
  text-align: center;
}
.file-upload-input {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
}
.image-upload-wrap {
  position: relative;
}
.image-upload-wrap:hover {
  background-color: white;
  border-color: 4px solid #efefef;
  border-radius: 3px;
}
.image-title-wrap {
  padding: 0 15px 15px 15px;
  color: #222;
}
.image-uploading-title,
.image-removing-title {
  display: none;
}
.drag-text {
  text-align: center;
  padding: 30px 0px;
  color: white;
}
.drag-text h3 {
  color: #333;
  font-weight: bold;
  font-size: 18px;
}
.file-upload-image {
  max-height: 200px;
  max-width: 200px;
  margin: auto;
  padding: 20px;
}
.remove-image {
  width: 200px;
  margin: 0;
  border: none;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  outline: none;
  text-transform: uppercase;
  font-weight: 700;
}
.remove-image {
  background: #cd4535;
  border-bottom: 4px solid #b02818;
  color: #fff;
}
.remove-image:hover {
  background: #c13b2a;
  color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.remove-image:active {
  border: 0;
  transition: all 0.2s ease;
}
</style>
