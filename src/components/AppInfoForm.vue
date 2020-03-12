<template>
    <div>
        <header class="label-icon-section">
            <img class="app-icon" :src="appInfo.icon" alt="icon">
            <h5 class="app-label" style="display: inline; vertical-align: middle;">
                {{ appInfo.application.label[0] }}
            </h5>
        </header>
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    Upload Package
                </a-button>
            </a-form-item>

            <a-form-item label="Package Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input placeholder="APP Package Name" disabled
                         v-decorator="['package', { rules: [{ required: true, message: 'Please input Package Name!' }] }]"
                />
            </a-form-item>
            <a-form-item label="Version Code" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input placeholder="APP Version Code"
                         v-decorator="['versionCode', { rules: [{ required: true, message: 'Please input Version Code!' }] }]"
                />
            </a-form-item>
            <a-form-item label="Version Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input placeholder="APP Version Name"
                         v-decorator="['versionName', { rules: [{ required: true, message: 'Please input Version Name!' }] }]"
                />
            </a-form-item>
            <div>
                <p>Target platform</p>
                <a-form-item label="minSdkVersion" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input placeholder="minSdkVersion"
                             v-decorator="['minSdkVersion', { rules: [{ required: true}] }]"
                    />
                </a-form-item>
                <a-form-item label="targetSdkVersion" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input placeholder="targetSdkVersion"
                             v-decorator="['targetSdkVersion', { rules: [{ required: true}] }]"
                    />
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script>
  export default {
    name: 'AppInfoForm',
    props: {
      appInfo: Object,
    },
    data () {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, {
          name: 'app-info',
          mapPropsToFields: () => {
            return {
              package: this.$form.createFormField({
                ...this.package,
                value: this.appInfo.package,
              }),
              versionCode: this.$form.createFormField({
                ...this.versionCode,
                value: this.appInfo.versionCode,
              }),
              versionName: this.$form.createFormField({
                ...this.versionName,
                value: this.appInfo.versionName,
              }),
              minSdkVersion: this.$form.createFormField({
                ...this.minSdkVersion,
                value: this.appInfo.usesSdk.minSdkVersion,
              }),
              targetSdkVersion: this.$form.createFormField({
                ...this.targetSdkVersion,
                value: this.appInfo.usesSdk.targetSdkVersion,
              }),

            }
          },
        }),
      }
    },
    watch: {
      appInfo () {
        this.form.updateFields({
          package: this.$form.createFormField({
            ...this.package,
            value: this.appInfo.package,
          }),
          versionCode: this.$form.createFormField({
            ...this.versionCode,
            value: this.appInfo.versionCode,
          }),
          versionName: this.$form.createFormField({
            ...this.versionName,
            value: this.appInfo.versionName,
          }),
          minSdkVersion: this.$form.createFormField({
            ...this.minSdkVersion,
            value: this.appInfo.usesSdk.minSdkVersion,
          }),
          targetSdkVersion: this.$form.createFormField({
            ...this.targetSdkVersion,
            value: this.appInfo.usesSdk.targetSdkVersion,
          }),

        })
      },
    },
    methods: {
      handleSubmit (e) {
        let self = this
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(self.form)
            console.log('Received values of form: ', values)
          }
        })
      },
    }
  }
</script>

<style scoped>
    .app-icon {
        display: inline-block;
        vertical-align: middle;
        padding: 5px;
        width: 100px;
    }

    .app-label {
        display: inline;
        vertical-align: middle;
        font-weight: 700;
        font-size: 2em;
        margin: 1em 0 .1em 0;
    }
</style>
