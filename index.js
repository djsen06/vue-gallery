onload = ()=>{
    Swal.fire({
        title: 'Tips!',
        html: `<div class="text-left text-lg font-light"><ul>
        <li class="rounded shadow bg-orange-200 p-2">Objects are loaded randomly from selected departments.</li>
        <li class="rounded shadow my-1 bg-red-200 p-2">Lightbox has been provided particularly to see the image.</li>
        <li class="rounded shadow bg-orange-200 p-2">Images in the lightbox are in original size so they might be heavy enough to load.</li>
        <li class="rounded shadow my-1 bg-red-200 p-2">More objects can be loaded by clicking the arrows at the bottom</li>
        </ul></div>`,
    }).then((res) => {
  if (res.value) {
    Swal.fire({
  icon: 'success',
  title: 'Musuem Gallery',
  text: 'Do Give feedback !!',
  footer: "Made by - Mohit Sen"
})
}
})
const app = new Vue({
    el:'#app',
    data: {
        isPublicDomain: true,
        primaryImageSmall: "",
        title: "",
        artistDisplayName: "",
        country: "",
        classification: "",
        department: "",
        objectDate: "",
        objectURL: "",
        medium: "",
        period: "",
        culture: "",
        objectID: 0,
        loading:true,   
    },
    methods: {
        prev: ()=>{
            var id = app.objectID
            app.objectID = --id
            //console.log(id)
            app.loading = true
            apiCall(id,0)     
        },
        next: ()=>{
            var id = app.objectID
            app.objectID = ++id
            app.loading = true
            apiCall(id,1)
        },
       
    },
    mounted() {
        this.loading = true
        var a = Math.floor(Math.random()*10)
        var arr =  [64843,74750,11139,941,35976,307450,321625,327602,22373,23054]
        fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+arr[a])
        .then(response => response.json())
        .then(data => {
            this.isPublicDomain = data.isPublicDomain
            this.primaryImageSmall = data.primaryImageSmall
            this.primaryImage = data.primaryImage
            this.title = data.title
            this.artistDisplayName = data.artistDisplayName
            this.country = data.country
            this.classification =  data.classification
            this.department = data.department
            this.objectDate = data.objectDate
            this.objectURL = data.objectURL
            this.medium =  data.medium
            this.period = data.period
            this.objectID = data.objectID
            this.culture = data.culture
            this.loading = false
        })
    }
})
function apiCall(id,flag){
    app.loading = true
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+id)
    .then(response => {
        if(response.status==404) {
            app.loading = true
            if(flag) apiCall(++id,flag)
            else apiCall(--id,flag)
        }
        return response.json()
    })
        .then(data => {
            app.isPublicDomain = data.isPublicDomain
            app.primaryImageSmall = data.primaryImageSmall
            app.primaryImage = data.primaryImage
            app.title = data.title
            app.artistDisplayName = data.artistDisplayName
            app.country = data.country
            app.classification =  data.classification
            app.department = data.department
            app.objectDate = data.objectDate
            app.objectURL = data.objectURL
            app.medium =  data.medium
            app.period = data.period
            app.objectID = data.objectID
            app.culture = data.culture
            app.loading = false
        })
        .catch((error) => {
            console.error(error);
          })
}}
