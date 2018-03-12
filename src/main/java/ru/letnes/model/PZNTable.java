package ru.letnes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "pzntable")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PZNTable implements IEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "PZN_ID_GENERATOR", sequenceName = "pzn_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PZN_ID_GENERATOR")
    @Column(unique = true, nullable = false)
    private Long id;

    @NotNull
    @Column(name = "pzn", unique = true)
    private String pzn;

    @Column(name = "name")
    private String name;

}
