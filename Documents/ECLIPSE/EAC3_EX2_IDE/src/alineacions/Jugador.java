package alineacions;

public class Jugador {
	private int codi;
	private String nom;
	private String posicio; 
		
	public Jugador(int codi, String nom, 
	String posicio) {
		this.codi = codi;
		this.nom = nom;
		this.posicio=posicio;
	}
	public void setPosicio(String posicio){
        this.posicio = posicio;
    }
	
	public String getPosicio(){
        return this.posicio;
    }
}


