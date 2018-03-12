package ru.letnes.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tnptable")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TNPTable implements IEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "TNP_ID_GENERATOR", sequenceName = "tnp_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TNP_ID_GENERATOR")
    @Column(unique = true, nullable = false)
    private Long id;

    @NotNull
    @Column(name = "tnp", nullable = false, unique = true)
    private String tnp;

    @NotNull
    @Column(name = "fullname", nullable = false)
    private String fullname;

}
