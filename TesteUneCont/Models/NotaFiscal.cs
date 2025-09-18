namespace TesteUneCont.Models
{
    public class NotaFiscal
    {
        public long numeroNota { get; set; }
        public string? nomeCliente { get; set; }
        public double valor { get; set; }
        public DateOnly? dataEmissao { get; set; }
        public DateTime dataCadastro { get; set; }
    }
}
