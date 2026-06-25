
const blogContainer = document.getElementById("blogContainer");

let posts = JSON.parse(localStorage.getItem("posts")) || [

{
    titulo:"JavaScript Moderno",
    texto:"Conheça os recursos mais recentes da linguagem JavaScript e como eles melhoram a produtividade dos desenvolvedores.",
    imagem:"https://picsum.photos/600/400?random=1"
},

{
    titulo:"HTML Semântico",
    texto:"Aprenda a criar páginas mais acessíveis e amigáveis para mecanismos de busca.",
    imagem:"https://picsum.photos/600/400?random=2"
},

{
    titulo:"CSS Grid Layout",
    texto:"Uma das ferramentas mais poderosas para construção de layouts modernos e responsivos.",
    imagem:"https://picsum.photos/600/400?random=3"
},

{
    titulo:"Flexbox na Prática",
    texto:"Domine alinhamentos e distribuições de elementos utilizando Flexbox.",
    imagem:"https://picsum.photos/600/400?random=4"
},

{
    titulo:"Git e GitHub",
    texto:"Controle de versões e colaboração profissional em projetos de software.",
    imagem:"https://picsum.photos/600/400?random=5"
},

{
    titulo:"React para Iniciantes",
    texto:"Conheça a biblioteca JavaScript mais popular para criação de interfaces.",
    imagem:"https://picsum.photos/600/400?random=6"
},

{
    titulo:"Inteligência Artificial",
    texto:"Como a IA está transformando o desenvolvimento de software moderno.",
    imagem:"https://picsum.photos/600/400?random=7"
},

{
    titulo:"Cyber Security",
    texto:"Boas práticas para proteger aplicações e dados de usuários.",
    imagem:"https://picsum.photos/600/400?random=8"
}

];

function salvar(){
    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );
}

function renderizar(){

    blogContainer.innerHTML = "";

    posts.forEach((post,index)=>{

        blogContainer.innerHTML += `

        <div class="blog-card">

            <img
                src="${post.imagem}"
                alt="${post.titulo}"
                class="blog-image">

            <h3>${post.titulo}</h3>

            <p>${post.texto}</p>

            <div class="blog-actions">

                <button
                    class="edit-btn"
                    onclick="editar(${index})">
                    Editar
                </button>

                <button
                    class="delete-btn"
                    onclick="remover(${index})">
                    Excluir
                </button>

            </div>

        </div>

        `;

    });

}

function editar(index){

    const novoTitulo =
    prompt(
        "Novo título:",
        posts[index].titulo
    );

    if(novoTitulo === null) return;

    const novoTexto =
    prompt(
        "Novo conteúdo:",
        posts[index].texto
    );

    if(novoTexto === null) return;

    posts[index].titulo = novoTitulo;
    posts[index].texto = novoTexto;

    salvar();
    renderizar();
}

function remover(index){

    const confirmar =
    confirm("Deseja excluir esta publicação?");

    if(confirmar){

        posts.splice(index,1);

        salvar();
        renderizar();
    }

}

document
.getElementById("addPost")
.addEventListener("click", ()=>{

    const titulo =
    document.getElementById("titulo").value.trim();

    const texto =
    document.getElementById("texto").value.trim();

    const arquivo =
    document.getElementById("imagem").files[0];

    if(!titulo || !texto || !arquivo){

        alert("Preencha todos os campos.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        posts.unshift({

            titulo: titulo,
            texto: texto,
            imagem: e.target.result

        });

        salvar();
        renderizar();

        document.getElementById("titulo").value = "";
        document.getElementById("texto").value = "";
        document.getElementById("imagem").value = "";

    };

    reader.readAsDataURL(arquivo);

});

renderizar();
 