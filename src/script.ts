

//a nossa forma

interface TypeVeiculo{
    nome:string,
    placa:string,
    entrada:Date|string
}




(function (){
    const $ = (query:string):HTMLInputElement|null=>document.querySelector(query)



    function calcTemp(mil:number){
        const min=Math.floor(mil/ 60000);
        const sec = Math.floor(mil % 60000)/1000


        return `${min}m e ${sec}s`;
    }





    function patio(){
        //aqui vamos guardar no localStorage que nada mais é que a memoria
        //do navegador
        function ler():TypeVeiculo[]{

            return localStorage.patio ? JSON.parse(localStorage.patio) :[]


        }

        function salvar(veiculos:TypeVeiculo[]){
            localStorage.setItem('patio', JSON.stringify(veiculos))


        }





        function adicionar(veiculo:TypeVeiculo, salvo?:boolean){
            const row = document.createElement("tr");

            row.innerHTML=`
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">x</button>
                </td>
            `;
            row.querySelector(".delete")?.addEventListener("click",function(){
                remover(this.dataset.placa)
            });



            //concatena com o patio e insere com o appendchild
            //chamo a tabela descrita no html pelo id e indico que o filho dela é a row criada
            $('#patio')?.appendChild(row)

            if(salvo) salvar([...ler(), veiculo]);


        }

        function remover(placa){

            const {entrada,nome} = ler().find(veiculo =>veiculo.placa === placa);

            const tempo =calcTemp(new Date().getTime() - new Date (entrada).getTime());

            if(!confirm(`O Veiculo ${nome} permaneceu por ${tempo},Desja encerrar? `)) return;

            salvar(ler().filter(veiculo =>veiculo.placa !== placa));
            render();
        }


        function render(){

            $("#patio")!.innerHTML = ""; // Limpa o conteúdo da tabela

            const patio=ler();

            if(patio.length){
                patio.forEach((veiculo) => adicionar(veiculo));
                    
                }
            }

        return{ler,adicionar,remover,salvar,render};
    }

    patio().render();
    $("#Vcadastrar")?.addEventListener("click",()=>{
//captura do nome
        const nome =$("#Vnome")?.value;
        const placa =$('#Vplaca')?.value;
        
        if(!nome||!placa){
            alert("Os campos Nome e Placa do veiculo são obrigatórios!");
            return;
        }

        patio().adicionar({nome,placa,entrada:new Date().toISOString()}, true)


    })





})();