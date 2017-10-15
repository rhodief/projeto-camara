# Projeto Novo Portal da Câmara dos Deputados

## Introdução
Este é o projeto criado por Jhonatan Cordeiro e Rhodie A. Ferreira para o desafio “Novo Portal da Câmara dos Deputados”.
Para montarmos o conceito do projeto, nos baseamos nas lições de Giacomo Sani (1992) que mostram que a participação política não é linear, possui 3 níveis de engajamento.
O primeiro nível é a Presença, em que o indivíduo se expõe de maneira passiva à mensagem política, como assistir a uma reunião.
O segundo é a Ativação, em que o indivíduo se engaja em algo coletivo, como participação em campanhas e protestos, por exemplo.
O terceiro é a Decisão, em que o indivíduo busca participação, ou de forma indireta, pelo voto, ou diretamente candidatando-se a um cargo eletivo.
Ademais, o autor destaca que a informação é insumo indispensável para o exercício da participação, pois sem ela, não há sobre o quê se posicionar.
A conclusão disso é que não temos um  perfil único de usuário-cidadão, mas usuários com diferentes interesses em diferentes profundidades.
Foi com base nisso que desenhamos o conceito geral do nosso projeto: ele deve ser progressivo e personalizável para fornecer, num nível mais básico, amplo acesso à informação de forma clara e explicativa. Num nível intermediário, deve fomentar o engajamento em relação aos debates e aos mecanismos de fiscalização da atividade parlamentar e, num nível mais avançado, convidar à participação nas decisões, presencial ou remotamente. 
Em resumo: o portal deve acomodar o espectro entre ser ser intuitivo e explicativo para o usuário leigo e, ao mesmo tempo, dinâmico e denso para o usuário avançado.

## Aspectos Gerais de Layout e Experiência do usuário
Inicialmente, falarei dos aspectos gerais de layout e experiência do usuário nas telas do projeto, após destacarei aspectos de navegação e arquitetura da informação e, por fim, mostraremos o espaço de personalização local que acreditamos colaborar para um maior engajamento.
Num primeiro nível, privilegiamos a informação didática. Assim, a página inicial mostra um resumo convidativo aos principais conteúdos do portal.
A primeira seção é de notícias, mostrando as principais no momento do acesso. 
Em seguida a seção “Atividade Parlamentar” que convida a conhecer o funcionamento da casa, os parlamentares e atividade legislativa.
Após, “Fiscalize”, mostrando as principais informações disponíveis, com descrição e link direto apontando para o agregador de Fiscalização.
“Participe”, informando como participar e quais os principais canais, com link direto para o agregador de Participação.
Por fim, a seção “Educação para a Democracia”, mostrando projetos institucionais de fomento à educação disponibilizados pela Câmara.
Utilizamos o padrão de cartão para o conteúdo do portal, que deixa o visual limpo, moderno e coeso. Utilizamos também alternância entre o fundo sólido e imagens entre as seções, para não cansar o usuário com a visualização dos mesmos elementos,  e ao mesmo tempo buscamos destacar o belo conjunto arquitetônico do Congresso Nacional nas imagens de fundo.
A página “Câmara Notícias” e de “agregador de macrotemas” foram pensadas para valorizar a informação. Assim, é mostrada cada notícia em um cartão, podendo ser exibida de diferentes formas para dar fluidez e organização à página, privilegiando o conteúdo ao vivo e os principais serviços da rede de comunicação da casa, além de informações correlatas de outros pontos do portal.
No agregador “Transparência”, são mostradas primeiro informações sobre o acesso à informação, convidando o usuário-cidadão a conhecer quais estão disponíveis e como acessá-las, tudo com descrição dos elementos para os quais os links apontam.
No agregador de “Participação”, são mostradas primeiro as principais ações sobre participação e, após, uma amostra mais detalhada dos mecanismos de participação, com ênfase no fale conosco, e-democracia e redes sociais.
A página padrão é simples e limpa, para privilegiar o conteúdo, com menu recolhível e links relacionados.

## Aspectos Gerais de Navegação e Arquitetura da Informação
Sobre a navegação e arquitetura da informação falaremos agora sobre os elementos comuns em todas as páginas.
No topo estão as configurações de acessibilidade. É possível mudar o tamanho da fonte e ativar o modo alto-contraste.
O menu é simples, possibilitando a navegação para os principais pontos do site. Ele também se encontra no rodapé, com nova forma de visualização.
As guias de acesso rápido agregam a busca geral do site, que por meio de input único, busca tanto o conteúdo dinâmico do portal quanto o sitemap, o que possibilita encontrar e navegar para qualquer ponto do portal.
A guia transmissões agrega os vídeos transmitidos ao vivo num determinado dia.
A guia agenda mostra os eventos da casa, com informações dinâmicas num formato  que facilita a experiência do usuário.
A guia notícias possui acesso direto aos agregadores de macrotemas de notícas, além do Câmara Notícias.
Destacamos, por fim, os atalhos de navegação pelo teclado, que possuem descrição dinâmica de suas ações, que aparecem ao manter pressionada a tecla “Alt”.

## \#MeuEspaçoCâmara
Apelidamos de \#MeuEspaçoCâmara o espaço de configuração personalizada que pode ser acessado por meio do botão com a logo da Câmara, sempre visível no canto inferior direito da página.
Nele é possível guardar qualquer página do portal para posterior acesso rápido, bastando acionar o botão de favoritos. (estrela amarela)
Para acessar o conteúdo gravado, basta ir ao  \#MeuEspaçoCâmara, na guia “Favoritos”. 
Na segunda guia “Painéis”, é possível adicionar widgets à página inicial, tornando-a personalizada de acordo com o interesse do usuário. Por exemplo: Um usuário que goste de sempre ver a programação da Tv Câmara ao vivo, pode acionar o respectivo painel.
Noutro exemplo, o usuário quer conhecer os deputados do seu estado, assim, pode ativar o painel “Meus Representantes”, que filtra automaticamente o estado por geolocalização, exibindo os resultados de forma dinâmica.
Na guia “Preferências”, é possível indicar temas de interesse e, assim, o conteúdo de notícia carrega imediatamente os temas selecionados.
Isso também é lido pala página “Câmara Notícias” que exibe os temas escolhidos de forma agrupada. Assim, é privilegiado o conteúdo que cada usuário tem mais interesse.
Essa guia também convida o usuário-cidadão a se cadastrar e participar do fale conosco e do e-democracia.
Ainda é possível importar ou exportar as configurações desse espaço, podendo compartilhar com outras pessoas ou importar uma previamente configurada em seu ambiente. Assim, é possível, por exemplo, configurar um espaço para acompanhar a reforma da previdência, com a proposição, principais texto, notícias, discursos, tudo a um click.
Repare que mesmo ao recarregar a página as informações personalizadas continuam lá. As informações ficam gravadas em local Storage, no navegador do usuário. 

O \#MeuEspaçoCâmara transforma a home do site numa verdadeira aplicação local, como um app de celular.

## Conclusão
A possibilidade de personalização local é uma forma fácil e sem burocracias de incentivar o usuário a conhecer e usar recursos disponíveis para obter a informação do seu interesse, sem necessidade de cadastros.
Conforme o engajamento aumente, o portal incentiva a inscrição para utilizar serviços de participação mais direta, como os do e-democracia.
Futuramente, caso seja implementada a ideia dos painéis na home, ela pode ser aberta à colaboração.
Assim, se alguém desenvolve um painel usando os dados abertos da Câmara, e caso a Câmara goste, pode ser disponibilizado para todos os usuários do portal, ou seja, o portal sozinho conseguiria agregar em si vários aplicativos.
Os painéis que colocamos neste projeto foram somente para exemplificar.
Esses foram os principais pontos. Agradecemos a oportunidade, aprendemos bastante nessa caminhada!

# Referência
SANI, Giacomo. Participação política. In: BOBBIO, N. et al. *Dicionário de política*.
Brasília: UnB, 1992, p. 888-890. 
