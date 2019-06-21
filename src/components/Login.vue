<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div class="header">Please login to continue</div>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              Please proceed with logging here.
            </slot>
          </div>
          <div class="modal-footer">
            <a class="modal-default-button" target="_blank" :href="loginUrl">Login Now</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Config from '../config'
export default {
  name: 'Modal',
  data: () => ({
    loginUrl: Config.LOGIN_URL
  })
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.header {
  font-size: 24px;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  background: #4E9CAF;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
