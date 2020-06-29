const reslist = document.querySelector('.restaurantlist');
const form=document.querySelector('#cafe-form');
const button=document.querySelector('.button');
const restaurantname=form.name.value;
const cityname=form.city.value;









const renderrestaurant=doc=>{
    let li = document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');
    let cross=document.createElement('span');
    let updatebutton=document.createElement('button');
    updatebutton.classList.add('buttontwo');
    updatebutton.textContent='EDIT'
   cross.classList.add('ml-10')
    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
   city.classList.add("m-10");
       cross.textContent = 'x';
       cross.classList.add('text-3xl');
       cross.classList.add('cursor-pointer');
   

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    reslist.appendChild(li);
    reslist.appendChild(updatebutton);
    
      cross.addEventListener('click', e => {
          e.stopPropagation();
          let id=e.target.parentElement.getAttribute('data-id');
          console.log(id);
         db.collection('restaurants').doc(id).delete();
      });
    //  db.collection('restaurants')

    //      .doc('xtvaEiKr81n9BbxH7MBB')
    //      .update({
    //          name: 'FFC'
    //      })
    //  edit
    //  db.collection('restaurants')

    //      .doc('xtvaEiKr81n9BbxH7MBB')
    //      .set({
    //          name: 'KFC'
    //      })

  
}
//different types of queries
//db.collection('restaurants').where('city',  '==', 'Dhaka').orderBy('name')
// db.collection('restaurants').get()
// db.collection('restaurants').where("city", "<=", "w").get()
db.collection('restaurants').get().then(snapshot => {
  

    snapshot.docs.forEach(doc => {
        renderrestaurant(doc);
       
    });

}).catch(err => {
    console.log(err);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('restaurants').add({
        name:form.name.value,
        city:form.city.value
    });
  
});
//Saving data in Firestore

//deleting data from firebase

//real time database
db.collection('restaurants').orderBy('city').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    // console.log(changes);
    changes.forEach(change => {
        if(change.type=='added'){
            renderrestaurant(change.doc);
        }else if(change.type=='removed'){
            let li = reslist.querySelector('[data-id=' + change.doc.id +  ']');
            reslist.removeChild(li);
        }
    });

});




