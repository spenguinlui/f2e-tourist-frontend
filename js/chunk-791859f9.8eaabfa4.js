(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-791859f9"],{"0e7d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login-card-container"},[i("div",{staticClass:"bg-card",style:{height:t.cardHight+"px",backgroundImage:t.bgImg}},[t._m(0)]),i("div",{ref:"loginCard",staticClass:"login-card"},[i("header",{staticClass:"login-card-header"},[i("button",{staticClass:"login-card-header-btn",class:{active:t.isLogin},attrs:{type:"button"},on:{click:function(e){t.isLogin=!t.isLogin}}},[t._v(t._s(t.identityZh)+"登入")]),i("button",{staticClass:"login-card-header-btn",class:{active:!t.isLogin},attrs:{type:"button"},on:{click:function(e){t.isLogin=!t.isLogin}}},[t._v(t._s("user"===t.identity?"新戶註冊":"supplier"===t.identity?"廠商申請":"--"))])]),i("section",{staticClass:"login-card-section"},[i("form",{staticClass:"form",attrs:{action:"post"}},[i("label",{staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-input-field",attrs:{type:"email",placeholder:" ",required:"required"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),i("span",{staticClass:"form-input-label"},[t._v("信箱")])]),i("label",{staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-input-field",attrs:{type:"password",placeholder:" ",required:"required"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),i("span",{staticClass:"form-input-label"},[t._v("密碼")])]),i("label",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"form-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPassword,expression:"confirmPassword"}],staticClass:"form-input-field",attrs:{type:"password",placeholder:" ",required:"required"},domProps:{value:t.confirmPassword},on:{input:function(e){e.target.composing||(t.confirmPassword=e.target.value)}}}),i("span",{staticClass:"form-input-label"},[t._v("再次輸入密碼")])]),i("a",{staticClass:"forget",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.forgetPassword.apply(null,arguments)}}},[t._v("忘記密碼？")]),i("div",{staticClass:"btn-group"},[i("button",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}],staticClass:"form-btn",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.formValidate(t.login)}}},[t._v("登入")]),i("button",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"form-btn",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.formValidate(t.signUp)}}},[t._v("註冊")])])]),"user"===t.identity?[t._m(1),i("div",{staticClass:"img-row"},[i("button",{attrs:{type:"button"}},[i("img",{attrs:{src:n("6de5"),alt:"facebook-icon"},on:{click:t.loginByFacebook}})]),i("button",{attrs:{type:"button"}},[i("img",{attrs:{src:n("f05d"),alt:"facebook-icon"},on:{click:t.loginByGoogle}})])])]:t._e()],2)])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[t._v("實現"),n("br"),t._v("夢想旅程")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hr-text"},[n("hr"),n("span",{staticClass:"text"},[t._v("快速登入")])])}],o=n("1da1"),r=(n("96cf"),n("bc3a")),a=n.n(r),c={props:["login","signUp","identity"],data:function(){return{email:"",password:"",confirmPassword:"",isLogin:!0,cardHight:""}},computed:{bgImg:function(){return this.isLogin?"url(".concat(n("e642"),")"):"url(".concat(n("d0fe"),")")},identityZh:function(){switch(this.identity){case"user":return"會員";case"supplier":return"廠商";case"admin":return"管理者";default:return"會員"}}},methods:{forgetPassword:function(){this.$router.push({name:"user-password-forget"})},formValidate:function(t){var e=this.isLogin,n=this.email,i=this.password,s=this.confirmPassword;n&&i?e||i===s?t({email:n,password:i}):window.alert("確認密碼不符！"):window.alert("信箱或密碼不得留空！")},loginByGoogle:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$gAuth.getAuthCode();case 2:n=e.sent,i=t,s="https://f2e-tourist-backend.herokuapp.com",a.a.post("".concat(s,"/api/v1/user/sign_in_by_google"),{code:n}).then((function(t){i.loginAndRedirect(t.data.token)})).catch((function(t){console.log("loginByGoogle: ".concat(t)),window.alert("登入失敗")}));case 6:case"end":return e.stop()}}),e)})))()},loginByFacebook:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t,i="https://f2e-tourist-backend.herokuapp.com",window.FB.login((function(t){a.a.post("".concat(i,"/api/v1/user/sign_in_by_facebook"),{code:t.authResponse.accessToken,userId:t.authResponse.userID}).then((function(t){n.loginAndRedirect(t.data.token)})).catch((function(t){console.log("loginByFacebook: ".concat(t)),window.alert("登入失敗")}))}),{scope:"public_profile, email"});case 3:case"end":return e.stop()}}),e)})))()},loginAndRedirect:function(t){this.$cookies.set("_u",t,"1d",null,window.location.hostname,!0),this.$store.commit("serverModule/UPDATE_USER_LOGIN",!0),window.alert("登入成功"),this.$router.push({name:"favorites"})}},created:function(){var t=this;this.$nextTick((function(){t.cardHight=t.$refs.loginCard.offsetHeight}))},updated:function(){this.cardHight=this.$refs.loginCard.offsetHeight}},u=c,l=(n("4c95"),n("2877")),d=Object(l["a"])(u,i,s,!1,null,"45d90db5",null);e["a"]=d.exports},"4c95":function(t,e,n){"use strict";n("78ae")},"4d66":function(t,e,n){"use strict";n("b433")},"6de5":function(t,e,n){t.exports=n.p+"img/facebook-login.b3deed93.svg"},"78ae":function(t,e,n){},b433:function(t,e,n){},ba8b:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("LoginCard",{attrs:{login:t.login,signUp:t.signUp,identity:"user"}})],1)},s=[],o=n("1da1"),r=(n("96cf"),n("0e7d")),a={methods:{login:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("serverModule/loginUserOnServer",{userParams:t,vm:e});case 2:case"end":return n.stop()}}),n)})))()},signUp:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("serverModule/signUpUserOnServer",{userParams:t,vm:e});case 2:case"end":return n.stop()}}),n)})))()}},components:{LoginCard:r["a"]}},c=a,u=(n("4d66"),n("2877")),l=Object(u["a"])(c,i,s,!1,null,"546046b7",null);e["default"]=l.exports},d0fe:function(t,e,n){t.exports=n.p+"img/sign-up-bg.31ee36e3.png"},e642:function(t,e,n){t.exports=n.p+"img/login-bg.19c72f58.png"},f05d:function(t,e,n){t.exports=n.p+"img/google-login.f67c55c4.svg"}}]);
//# sourceMappingURL=chunk-791859f9.8eaabfa4.js.map