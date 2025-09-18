using Microsoft.AspNetCore.Mvc;
using TesteUneCont.Models;
namespace TesteUneCont.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotasController : Controller
    {
        private static List<NotaFiscal> _listaNotas = new List<NotaFiscal>();
        
        [HttpGet]
        public IActionResult GetNotas()
        {
            return Ok(_listaNotas);
        }
        [HttpPost]
        public IActionResult PostNotas([FromBody] NotaFiscal notaFiscal)
        {
            if (notaFiscal.numeroNota <= 0)
                return BadRequest("Numero da nota precisa ser maior que 0");
            if (string.IsNullOrEmpty(notaFiscal.nomeCliente))
                return BadRequest("Preencher Nome do Cliente");
            if (notaFiscal.valor <=0)
                return BadRequest("Valor precisa ser maior que 0");
            if (!notaFiscal.dataEmissao.HasValue)
                return BadRequest("Preencher Data de Emissão");

            notaFiscal.dataCadastro = DateTime.Now;
            _listaNotas.Add(notaFiscal);

            return Ok(_listaNotas);
        }
    }
}
