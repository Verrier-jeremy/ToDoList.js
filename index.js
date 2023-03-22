const taskEnter = document.getElementById('addNote');
const divNotes = document.querySelector('.listNotes');

const addNewNote = document.getElementById('newNote');
addNewNote.addEventListener('click', newNote)

let addCategorie = document.getElementById('addCategorie');
addCategorie.addEventListener('change', hideClass);
let inputNewCategorie = document.getElementById('newCategorie');

let note = 0;
let categories = [];

let alphanumériqueregexp = new RegExp("[a-zA-Z0-9àâäéèêëïîôöùûüç+\-\/*_@]{1,31}", 'i');
isNote(note);
hideClass();

let liEmpty = document.querySelector('.liEmpty');

function hideClass(){
    if(addCategorie.value == 'Nouvelle catégorie'){
        inputNewCategorie.classList.remove('hide');
    }else{
        inputNewCategorie.classList.add('hide');
    }
}

function isNote(e){
    let liEmpty = document.querySelector('.liEmpty');
    if(e == 0){
        divNotes.innerHTML = "<p class='liEmpty fs25'> Vous n'avez aucune note ! </p>"
    }else if((e > 0) && (liEmpty != null)){
        liEmpty.remove()
    }else{
    }
}

let liNote = document.querySelector(`.liNote`);
function newNote(){
    if(taskEnter.value == ''){
        alert("Aucune tache n'a été mentionnée !")
    }else if((addCategorie.value == 'Nouvelle catégorie') && (inputNewCategorie.value == '')){
        alert("Aucune categorie n'a été selectionnée !")
    }else{
        let validNote = validationInput(taskEnter.value);        
        if((addCategorie.value == 'Nouvelle catégorie') && (validNote) ){
            let validCategorie = validationInput(inputNewCategorie.value)
            validCategorie ? ctlCategorie(inputNewCategorie.value) : ''

            
        }else if(validNote){
            note++;
            newLiInBloc(addCategorie.value);
        }
    }
    isNote(note);
    
}

function deleteLiNote(e){
    let lengthLi = e.parentElement.childNodes.length;
    let articleId = e.parentElement.parentElement
    let indexdeletecategorie = categories.indexOf(articleId.id);
    let idLiNote = e.id;
    let deleteNote = document.getElementById(idLiNote);
    deleteNote.remove();
    lengthLi = lengthLi-1;
    note--;
    if(lengthLi == 0){
        categories = categories.filter(element => element != articleId.id);
        addCategorie.options.remove([indexdeletecategorie+1])
        articleId.remove();
        isNote(note);
    }else{
        isNote(note); 
    }
    
}

function modifyLiNote(e){
    let idLiNote = e.id;
    let modifyNote = document.getElementById(idLiNote)

    let aksModification = prompt(`Quelle tache va remplacer : ${e.firstChild.data}`);
    if(aksModification != ""){
        modifyNote.firstChild.textContent = aksModification;
    }

}

function checkedTask(taskId){
    let id = taskId.id;
    let inputChecked = document.getElementById(id)
    let liChecked = inputChecked.parentElement.parentElement;

    if(inputChecked.checked){
        liChecked.classList.add('bg-green');
    }else {
        liChecked.classList.remove('bg-green');
    }
    
}

function newBlocNote(idBloc){
    let newBloc = document.createElement('article');
    newBloc.classList.add('BlocNote');
    newBloc.id = idBloc;
    divNotes.appendChild(newBloc);

    let titleBloc = document.createElement('h2');
    titleBloc.classList.add('titleBloc');
    titleBloc.classList.add('fw700');
    titleBloc.classList.add('fs28');
    titleBloc.id = `title${idBloc}`;
    titleBloc.innerText = `${idBloc}`;
    newBloc.appendChild(titleBloc)

    let ulNotes = document.createElement('ul');
    ulNotes.classList.add('ulNote');
    ulNotes.id = `ul${idBloc}`;
    newBloc.appendChild(ulNotes);

    liNote = document.createElement('li');
    liNote.classList.add('liNote');
    liNote.id = `liNote${note}`;
    ulNotes.appendChild(liNote);

    liNote.innerText += taskEnter.value;
    liNote.innerHTML +=`
    <div class="interactionNote">
        <input class="fs25" id="checked${note}" onclick=checkedTask(checked${note}) type='checkbox'></input>
        <button onclick=modifyLiNote(${liNote.id}) class="modifyNote widthbutton fs25">🖉</button>
        <button onclick=deleteLiNote(${liNote.id}) class="deleteNote widthbutton fs25">🗑</button>
    </div>`;
    taskEnter.value= '';
    liNote = document.querySelector(`.liNote`);
}

function newLiInBloc(idBloc){
    let ulNotes = document.getElementById(`ul${idBloc}`)
    liNote = document.createElement('li');
    liNote.classList.add('liNote');
    liNote.id = `liNote${note}`;
    ulNotes.appendChild(liNote);

    liNote.innerText += taskEnter.value;
    liNote.innerHTML +=`
    <div class="interactionNote">
        <input class="fs25" id="checked${note}" onclick=checkedTask(checked${note}) type='checkbox'></input>
        <button onclick=modifyLiNote(${liNote.id}) class="modifyNote widthbutton fs25">🖉</button>
        <button onclick=deleteLiNote(${liNote.id}) class="deleteNote widthbutton fs25">🗑</button>
    </div>`;

    taskEnter.value= '';
    liNote = document.querySelector(`.liNote`);
}

function ctlCategorie(categorie){
    let isInCategorie = categories.find(e => e == categorie)
    if (isInCategorie == undefined){
        note++;
        categories.push(categorie);
        addCategorie.innerHTML += `<option value="${inputNewCategorie.value}">  ${inputNewCategorie.value}</option>`;
        inputNewCategorie.value = '';
        newBlocNote(categorie)  
    }else{
        alert('Cette catégorie est déjà existante !');
    }

}

function validationInput(input){
    let validInput = alphanumériqueregexp.test(input);
    if(validInput){
        console.log(validInput,'validInput')
        return validInput;
    }else{
        alert("Un caractère saissi n'est pas autorisé (caractères autorisés : A à Z, a à z et à,â,ä,é,è,ê,ë,ï,î,ô,ö,ù,û,ü,ç,+,-,/,*,_,@)");
    }
}


