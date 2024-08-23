package com.prueba_java.demo.connection;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

public class Connection {
    private static SqlSessionFactory sessionFactory = null;
    private static String CONFIGURATION_FILE = "sql_configuration.xml";

    private Connection() {
        try {
            Reader reader = Resources.getResourceAsReader(CONFIGURATION_FILE);
            sessionFactory = new SqlSessionFactoryBuilder().build(reader);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error loading MyBatis configuration file.", e);
        }
    }

    public static SqlSessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            synchronized (Connection.class) {
                if (sessionFactory == null) {
                    new Connection();
                }
            }
        }
        return sessionFactory;
    }

}
