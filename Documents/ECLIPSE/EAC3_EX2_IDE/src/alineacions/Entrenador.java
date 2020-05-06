package alineacions;

public class Entrenador {
	private int codi;
	private String nom;
	private String tipus;
	private Double salari;
	public Entrenador(int codi, String nom, 
String tipus) {
	this.codi = codi;
	this.nom = nom;
	this.tipus=tipus;
}
	public Entrenador (int codi, String nom, String tipus, Double salari) {
		this.codi = codi;
		this.nom = nom;
		this.tipus=tipus;
		this.salari=salari;
	}
}


