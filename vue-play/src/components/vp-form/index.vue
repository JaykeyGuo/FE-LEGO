<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'vpForm',
  provide() {
    //  [不懂的可以看看](https://cn.vuejs.org/v2/api/#provide-inject)
    return {
      form: this,
    };
  },
  props: {
    // 当前 form 的model
    model: {
      type: Object,
    },
    // 验证
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      fields: [], // 储存当前的 form-item的实例
    };
  },
  created() {
    // 存当前实例
    const that = this;
    this.$on('on-form-item-add', (item) => {
      if (item) {
        that.fields.push(item);
      }
    });
    // 删除当前有的实例
    this.$on('on-form-item-remove', (item) => {
      if (item.prop) {
        // 如果当前没有prop的话表示当前不要进行删除（因为没有注入）
        that.fields.splice(that.fields.indexOf(item), 1);
      }
    });
  },
  methods: {
    /**
     * 清空
     */
    resetFields() {
      // 添加resetFields方法使用的时候调用即可
      /**
       * 当前所有当form-item 进行赋值
       */
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    /**
     * 校验 公开方法：全部校验数据，支持 Promise
     */
    validate(callback) {
      return new Promise((resolve) => {
        /**
         * 当前所有当form-item 进行校验
         */
        let valid = true; // 默认是通过
        let count = 0; // 来匹配当前是否是全部检查完
        this.fields.forEach((field) => {
          // 每个实例都会有 validation 的校验的方法
          field.validation('', (error) => {
            // 只要有一个不符合那么当前的校验就是未通过的
            if ((error)) {
              valid = false;
            }
            // 通过当前检查完所有的form-item的时候才会调用
            if (++count === this.fields.length) {
              if (typeof callback === 'function') {
                callback(valid); // 直接调用注入的回调方法
              }
              resolve(valid); // 方法使用then
            }
          });
        });
        resolve(valid);
      });
    },
  },
};
</script>
