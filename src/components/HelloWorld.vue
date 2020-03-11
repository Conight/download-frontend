<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div class="select-files-section">
            <label for="file-input"> Drop APK here or click to select file</label>
            <input id="file-input"
                   type="file" name="app-selector"
                   accept="application/vnd.android.package-archive"
                   style="display: none;"
                   @change="handleAPKParse"
            >
        </div>
        <a-skeleton :loading="loading" active :paragraph="{rows: 4}">
            <div v-if="appInfo !== undefined">
                <div v-if="fileInfo !== undefined" class="file-name" style="display: block;">
                    {{ fileInfo.name }} ({{ Math.round(fileInfo.size / 1024 / 1024 * 100) / 100 }} MB)
                </div>
                <AppInfoForm :appInfo="appInfo"/>
            </div>
        </a-skeleton>
    </div>
</template>

<script>
  import ApkParser from 'app-info-parser'
  import AppInfoForm from './AppInfoForm.vue'

  export default {
    name: 'HelloWorld',
    components: {
      AppInfoForm
    },
    props: {
      msg: String
    },
    data: function () {
      return {
        appInfo: undefined,
        fileInfo: undefined,
        loading: false
      }
    },
    methods: {
      handleAPKParse (e) {
        let self = this
        if (e.target.files.length > 0) {
          self.loading = true
          self.fileInfo = e.target.files[0]
          const parser = new ApkParser(self.fileInfo)
          parser.parse().then(result => {
            self.appInfo = result
            console.log(self.appInfo)
            self.loading = false
          }).catch(err => {
            console.error(err)
            self.loading = false
          })
        } else {
          self.appInfo = undefined
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .select-files-section {
        border: 2px dashed #bbb;
        color: rgb(27, 179, 233);
        border-radius: 5px;
        text-align: center;
        margin-bottom: 15px;
        box-sizing: border-box;
        display: block;
    }

    .select-files-section label {
        cursor: pointer;
        font-size: 1.4em;
        padding: 25px;
        font-weight: 600;
        margin-bottom: .425rem;
        display: block;
    }

    input[type="file"] {
        width: 100%;
    }

    .file-name {
        font-weight: 700;
        margin: 15px 5px 25px 0;
    }
</style>
