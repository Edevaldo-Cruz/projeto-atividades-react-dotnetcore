using Microsoft.AspNetCore.Mvc;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : Controller
    {
        [HttpGet]
       public string Get()
        {
            return "meu primeiro metodo get";
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "meu primeiro metodo get";
        }

        [HttpPost]
        public string Post()
        {
            return "meu primeiro metodo Post";
        }

        [HttpPut("{id}")]
        public string Put(int Id)
        {
            return "meu primeiro metodo Put";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return "meu primeiro metodo Delete";
        }
    }
}
